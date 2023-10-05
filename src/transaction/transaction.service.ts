import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../survey/survey.entity';
import { createRandomAlphabets } from '../util/createRandomAlphabets';
import { Repository, DataSource, QueryFailedError } from 'typeorm';
import { Posting } from '../posting/posting.entity';
import { Section } from '../section/section.entity';
import { Question } from '../question/question.entity';
import { SelectableOption } from '../selectable-option/selectable-option.entity';
import { CreateWholeSurveyDTO } from '../survey/createWholeSurvey.dto';
import logObject from '../util/logObject';
import { SetDictionary } from '../util/SetDictionary';
import { CreateParticipationDTO } from 'src/survey/CreateParticipation.dto';
import { In } from 'typeorm';
import { Participating } from 'src/participating/participating.entity';
import { User } from 'src/user/user.entity';
import { ExpectedTimeSpent } from 'src/expected-time-spent/ExpectedTimeSpent.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Survey) private surveyRepo: Repository<Survey>,
    @InjectRepository(Posting) private postingRepo: Repository<Posting>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Participating)
    private participatingRepo: Repository<Participating>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(SelectableOption)
    private selectableOptionRepo: Repository<SelectableOption>,
    @InjectRepository(ExpectedTimeSpent)
    private timeSpentRepo: Repository<ExpectedTimeSpent>,
    private dataSource: DataSource,
  ) {}

  // 나중에, Response 와 통합될 수 있음. 수정할 것. section_ids 는 받지 않아야함.
  async participateToSurvey(participationDTO: CreateParticipationDTO) {
    let { survey_id, section_ids, user_id } = participationDTO;

    const sections = await this.sectionRepo.findBy({ id: In(section_ids) });
    const participatings: Participating[] = [];

    let totalReward = 0;
    sections.forEach((section) => {
      let participating = this.participatingRepo.create({
        survey_id,
        section_id: section.id,
        user_id,
      });
      participatings.push(participating);

      // totalReward += section.reward;
    });

    const currentUser = await this.userRepo.findOneBy({ id: user_id });
    const currentSurvey = await this.surveyRepo.findOneBy({ id: survey_id });
    currentSurvey.current_participation += 1;

    if (
      currentSurvey.current_participation >= currentSurvey.participation_goal
    ) {
      currentSurvey.is_completed = 1;
    }

    totalReward += currentSurvey.reward;
    currentUser.collected_reward += totalReward;

    currentUser.reputation += 1;
    currentUser.fatigue += 1;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(User, currentUser);
      await queryRunner.manager.save(Survey, currentSurvey);
      const participatingPromises = Array.from(participatings).map(
        async (participating) => {
          await queryRunner.manager.save(Participating, participating);
        },
      );
      await Promise.all(participatingPromises);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return 'Success';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    }
  }

  //
  // 현재, 값 중복이 너무 많아. 이것들이 다 따로 존재..
  // section 안에 q 있고 그 q 안에 so 있음
  // q 안에 so 있음
  // so 있음
  async createWholeSurvey(wholeSurvey: CreateWholeSurveyDTO) {
    console.log(`passed object: ${JSON.stringify(wholeSurvey)}`);
    // TODO: expectedTime 계산해서 반영하기.
    let { survey, sections, questions, selectable_options } = wholeSurvey;
    console.log(`[createWholeSurvey] flag 1`);
    const tempSurvey = this.surveyRepo.create({ ...survey });

    const timeSpents = await this.timeSpentRepo.find();
    // dictionary 로 만들기.
    const timeSpentDic = {};

    let expectedTimeInSec = 0;
    console.log(`[createWholeSurvey] flag 2`);
    timeSpents.forEach((el) => {
      timeSpentDic[el.id] = el.time_take_in_sec;
    });

    tempSurvey.code = createRandomAlphabets(7);
    console.log(`[createWholeSurvey] flag 3`);
    let tempSections: Section[] = [];
    sections.forEach((section) => {
      const tempSection = this.sectionRepo.create({ ...section });
      tempSections.push(tempSection);
    });

    logObject('tempSections: ', tempSections);
    console.log(`[createWholeSurvey] flag 4`);
    let tempQuestions: Question[] = [];

    questions.forEach((q) => {
      expectedTimeInSec += timeSpentDic[q.question_type_id];
      const tempQ = this.questionRepo.create({ ...q });
      tempQuestions.push(tempQ);
    });
    console.log(`[createWholeSurvey] flag 5`);
    tempSurvey.expected_time_in_sec = expectedTimeInSec;
    logObject('tempQuestions: ', tempQuestions);

    let tempSelectableOptions: SelectableOption[] = [];

    selectable_options.forEach((so) => {
      const tempSelectableOption = this.selectableOptionRepo.create({ ...so });
      tempSelectableOptions.push(tempSelectableOption);
    });
    console.log(`[createWholeSurvey] flag 6`);
    const sToQDic: SetDictionary<Question> = {};
    const qToSODic: SetDictionary<SelectableOption> = {};

    sections.forEach((s) => {
      sToQDic[s.id] = new Set<Question>();
    });
    console.log(`[createWholeSurvey] flag 7`);
    questions.forEach((q) => {
      qToSODic[q.id] = new Set<SelectableOption>();
      const question: Question = { ...q };
      sToQDic[q.section_id].add(question);
    });
    console.log(`[createWholeSurvey] flag 8`);
    selectable_options.forEach((so) => {
      qToSODic[so.question_id].add(so);
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Survey, Posting
      const mysurvey = await queryRunner.manager.save(Survey, tempSurvey);
      const posting = await this.postingRepo.create({
        survey_id: mysurvey.id,
        user_id: survey.user_id,
      });
      await queryRunner.manager.save(Posting, posting);
      console.log(`[createWholeSurvey] flag 9`);

      // Process sections, questions, and selectable options using Promise.all
      const sectionPromises = sections.map(async (s) => {
        s.survey_id = mysurvey.id;

        const tempSection = this.sectionRepo.create(s);
        let matchingQuestions = sToQDic[s.id];

        tempSection.id = null;
        const mySection = await queryRunner.manager.save(Section, tempSection);

        const questionPromises = Array.from(matchingQuestions).map(
          async (q) => {
            q.section_id = mySection.id;
            q.survey_id = mysurvey.id;

            let matchingSelectableOptions = qToSODic[q.id];

            let tempQuestion = this.questionRepo.create(q);
            tempQuestion.id = null;
            console.log(`tempQuestion's id: ${tempQuestion.id}`);
            const myQuestion = await queryRunner.manager.save(
              Question,
              tempQuestion,
            );
            console.log(`[createWholeSurvey] flag 10`);
            console.log(`myQuestion's id: ${myQuestion.id}`);
            const soPromises = Array.from(matchingSelectableOptions).map(
              async (so) => {
                so.question_id = myQuestion.id;
                so.section_id = mySection.id;
                so.id = undefined;
                const tempSO = this.selectableOptionRepo.create(so);
                await queryRunner.manager.save(SelectableOption, tempSO);
              },
            );

            await Promise.all(soPromises);
          },
        );

        await Promise.all(questionPromises);
      });

      await Promise.all(sectionPromises);

      // "flag 7" 출력
      console.log('flag 7');

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return 'Success';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    }
  }
}
