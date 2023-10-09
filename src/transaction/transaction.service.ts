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
import { error } from 'console';
import { SurveyGenre } from 'src/survey_genre/survey_genre.entity';

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
    @InjectRepository(SurveyGenre)
    private surveyGenreRepo: Repository<SurveyGenre>,
    private dataSource: DataSource,
  ) {}

  // 나중에, Response 와 통합될 수 있음. 수정할 것. section_ids 는 받지 않아야함.
  async participateToSurvey(participationDTO: CreateParticipationDTO) {
    // let { survey_id, section_ids, user_id } = participationDTO;
    let { survey_id, user_id } = participationDTO;

    // const sections = await this.sectionRepo.findBy({ id: In(section_ids) });
    const participatings: Participating[] = [];

    // sections.forEach((section) => {
    //   let participating = this.participatingRepo.create({
    //     survey_id,
    //     // section_id: section.id,
    //     user_id,
    //   });
    //   participatings.push(participating);

    //   // totalReward += section.reward;
    // });

    const currentUser = await this.userRepo.findOneBy({ id: user_id });
    const currentSurvey = await this.surveyRepo.findOneBy({ id: survey_id });
    currentSurvey.current_participation += 1;

    if (
      currentSurvey.current_participation >= currentSurvey.participation_goal
    ) {
      currentSurvey.is_completed = 1;
    }

    // totalReward += currentSurvey.reward;
    currentUser.collected_reward += currentSurvey.reward;

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
      console.error('Error occurred', err);
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
    const genreIds = survey.genre_ids;
    // survey.num_of_sections = sections.length;
    // survey.genre_ids
    console.log(`[createWholeSurvey] flag 1`);
    const tempSurvey = this.surveyRepo.create({ ...survey });

    const timeSpents = await this.timeSpentRepo.find();
    // dictionary 로 만들기.
    const timeSpentDic = {};

    let expectedTimeInSec = 0;
    console.log(`[createWholeSurvey] flag 2`);
    timeSpents.forEach((el) => {
      timeSpentDic[el.id] = el.time_take_in_sec;
      logObject('timeSpentDic:', timeSpentDic);
      logObject('el.id: ', el.id);
      logObject('el.time_take_in_sec:', el.time_take_in_sec);
    });
    // timeSpentDic:: {"100":5,"200":10,"300":20}

    tempSurvey.code = createRandomAlphabets(7);
    console.log(`[createWholeSurvey] flag 3`);
    let tempSections: Section[] = [];
    // Section 이 없는 경우는 ? 말이 안됨
    sections.forEach((section) => {
      const tempSection = this.sectionRepo.create({ ...section });
      tempSections.push(tempSection);
    });

    logObject('tempSections: ', tempSections);
    console.log(`[createWholeSurvey] flag 4`);

    let tempQuestions: Question[] = [];

    questions.forEach((q) => {
      console.log(
        `timeSpentDic[${q.question_type_id}] == ${
          timeSpentDic[q.question_type_id]
        }`,
      );
      expectedTimeInSec += timeSpentDic[q.question_type_id];
      const tempQ = this.questionRepo.create({ ...q });
      tempQuestions.push(tempQ);
    });

    console.log(`[createWholeSurvey] flag 5`);
    if (expectedTimeInSec) {
      tempSurvey.expected_time_in_sec = expectedTimeInSec;
    } else {
      tempSurvey.expected_time_in_sec = 100;
    }
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
    console.log(`[createWholeSurvey] flag 9`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Survey, Posting
      logObject('tempSurvey: ', tempSurvey);
      const mysurvey = await queryRunner.manager.save(Survey, tempSurvey);

      // genreIds.forEach(async (genreId) => {
      //   const surveyGenre = this.surveyGenreRepo.create({
      //     genre_id: genreId,
      //     survey_id: mysurvey.id,
      //   });
      //   await queryRunner.manager.save(SurveyGenre, surveyGenre);
      // });

      const surveyGenrePromises = Array.from(genreIds).map(async (genreId) => {
        const surveyGenre = this.surveyGenreRepo.create({
          genre_id: genreId,
          survey_id: mysurvey.id,
        });
        await queryRunner.manager.save(SurveyGenre, surveyGenre);
      });
      await Promise.all(surveyGenrePromises);

      console.log(`[createWholeSurvey] flag 10`);
      const posting = await this.postingRepo.create({
        survey_id: mysurvey.id,
        user_id: survey.user_id,
      });
      // 'participating', 'CREATE TABLE `participating` (\n  `user_id` int(11) DEFAULT NULL,\n  `survey_id` int(11) DEFAULT NULL,\n  `section_id` int(11) DEFAULT NULL,\n  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n  `id` int(11) DEFAULT NULL,\n  UNIQUE KEY `user_id` (`user_id`,`survey_id`,`section_id`),\n  KEY `survey_id` (`survey_id`),\n  KEY `section_id` (`section_id`),\n  CONSTRAINT `participating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),\n  CONSTRAINT `participating_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`id`),\n  CONSTRAINT `participating_ibfk_3` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8'

      await queryRunner.manager.save(Posting, posting);
      console.log(`[createWholeSurvey] flag 11`);

      // Process sections, questions, and selectable options using Promise.all
      const sectionPromises = sections.map(async (s) => {
        s.survey_id = mysurvey.id;

        const tempSection = this.sectionRepo.create(s);
        let matchingQuestions = sToQDic[s.id];
        console.log(`[createWholeSurvey] flag 12`);
        tempSection.id = null;
        const mySection = await queryRunner.manager.save(Section, tempSection);
        console.log(`[createWholeSurvey] flag 13`);

        const questionPromises = Array.from(matchingQuestions).map(
          async (q) => {
            q.section_id = mySection.id;
            q.survey_id = mysurvey.id;
            console.log(`[createWholeSurvey] flag 14`);
            let matchingSelectableOptions = qToSODic[q.id];

            let tempQuestion = this.questionRepo.create(q);
            tempQuestion.id = null;
            console.log(`tempQuestion's id: ${tempQuestion.id}`);
            const myQuestion = await queryRunner.manager.save(
              Question,
              tempQuestion,
            );
            console.log(`[createWholeSurvey] flag 15`);
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
            console.log(`[createWholeSurvey] flag 16`);
            await Promise.all(soPromises);
          },
        );

        await Promise.all(questionPromises);
        console.log(`[createWholeSurvey] flag 17`);
      });

      await Promise.all(sectionPromises);

      // "flag 7" 출력
      console.log('flag 7');
      console.log(`[createWholeSurvey] flag 18`);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return 'Success';
    } catch (err) {
      console.error('Error occurred', err);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    }
  }
}
