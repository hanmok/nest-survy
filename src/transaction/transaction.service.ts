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

  // Create Survey, connect using 'Posting'
  // async createSurvey(
  //   title: string,
  //   participationGoal: number,
  //   user_id: number,
  // ) {
  //   // create Survey
  //   const tempSurvey = this.surveyRepo.create({
  //     title,
  //     participation_goal: participationGoal,
  //   });
  //   tempSurvey.code = createRandomAlphabets(7);

  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     // 여기서 실패할 수도 있어? 음.. 불가능할텐데 ?
  //     // queryRunner.manager.save: DB 에 저장
  //     const survey = await queryRunner.manager.save(Survey, tempSurvey);

  //     // create Posting
  //     const posting = await this.postingRepo.create({
  //       survey_id: survey.id,
  //       user_id,
  //     });

  //     await queryRunner.manager.save(Posting, posting);
  //     console.log(`transaction committed!!`);
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     console.log(`err: ${err}`);
  //     await queryRunner.rollbackTransaction();
  //     throw new BadRequestException();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // 나중에, Response 와 통합될 수 있음.
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

      totalReward += section.reward;
    });
    const currentUser = await this.userRepo.findOneBy({ id: user_id });
    const currentSurvey = await this.surveyRepo.findOneBy({ id: survey_id });
    currentSurvey.current_participation += 1;

    if (
      currentSurvey.current_participation >= currentSurvey.participation_goal
    ) {
      currentSurvey.is_completed = 1;
    }

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

  async createWholeSurvey(wholeSurvey: CreateWholeSurveyDTO) {
    console.log(`passed object: ${JSON.stringify(wholeSurvey)}`);

    let { survey, sections, questions, selectable_options } = wholeSurvey;

    const tempSurvey = this.surveyRepo.create({ ...survey });
    tempSurvey.code = createRandomAlphabets(7);

    let tempSections: Section[] = [];
    sections.forEach((section) => {
      const tempSection = this.sectionRepo.create({ ...section });
      tempSections.push(tempSection);
    });

    logObject('tempSections: ', tempSections);

    let tempQuestions: Question[] = [];
    questions.forEach((q) => {
      const tempQ = this.questionRepo.create({ ...q });
      tempQuestions.push(tempQ);
    });
    logObject('tempQuestions: ', tempQuestions);

    let tempSelectableOptions: SelectableOption[] = [];
    selectable_options.forEach((so) => {
      const tempSelectableOption = this.selectableOptionRepo.create({ ...so });
      tempSelectableOptions.push(tempSelectableOption);
    });

    const sToQDic: SetDictionary<Question> = {};
    const qToSODic: SetDictionary<SelectableOption> = {};

    sections.forEach((s) => {
      sToQDic[s.id] = new Set<Question>();
    });

    questions.forEach((q) => {
      qToSODic[q.id] = new Set<SelectableOption>();
      const question: Question = { ...q };
      sToQDic[q.section_id].add(question);
    });

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
