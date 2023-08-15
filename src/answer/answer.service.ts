import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { SelectableOptionService } from './../selectable-option/selectable-option.service';
import { QuestionService } from 'src/question/question.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { In, Repository } from 'typeorm';
import { CreateAnswerDTO } from './createAnswer.dto';
import { SectionService } from 'src/section/section.service';
import { MatchedAnswer } from 'src/util/MatchedAnswer';
import { ParticipatingService } from 'src/participating/participating.service';
import { Participating } from 'src/participating/participating.entity';
import { UserAnswer } from 'src/util/userAnswer';
import { AnswerPair } from 'src/util/AnswerPair';
import { QuestionPair } from 'src/util/questionPair';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answerRepo: Repository<Answer>,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private selectableOptionService: SelectableOptionService,
    private participatingService: ParticipatingService,
  ) {}

  async getAll() {
    return await this.answerRepo.find();
  }

  async createAnswer(createAnswerDTO: CreateAnswerDTO) {
    const answer = this.answerRepo.create(createAnswerDTO);
    return await this.answerRepo.save(answer);
  }

  async getAnswersByUserId(user_id: number, survey_id: number) {
    // 1. 질문들 모두 가져오기. (Section Service 필요, position 에 따라 오름차순 정렬)
    // const question_ids = (
    //   await this.sectionService.findQuestionsBySectionId(section_id)
    // )
    const questions = (
      await this.questionService.findBySurveyId(survey_id)
    ).sort((a, b) => a.position - b.position);
    // .map((question) => question.id);

    // 2. Answer 중 survey_id, user_id 에 해당하는 것들 가져오기.
    const answers = await this.answerRepo.find({
      where: { survey_id, user_id },
    }); // questions 와 매칭시키기. How ?? answer -> question_id

    // const ansSelectableOptions = answers.map((ans) => ans.selectableOption_id);

    const selectableIds = answers.map((answer) => answer.selectableOption_id);
    // const uniqueSelectableIds = selectableIds.filter( // 할필요 없음.
    //   (item, index) => selectableIds.indexOf(item) === index,
    // );

    const selectableOptions = await this.selectableOptionService.findByIds(
      // uniqueSelectableIds,
      selectableIds,
    );

    let selectableDictionary = {};
    selectableOptions.forEach((selectableOption) => {
      selectableDictionary[selectableOption.id] = selectableOption.value;
    });

    let matchedAnswers: MatchedAnswer[] = [];
    questions.forEach((question) => {
      // 이미 sorted 됨
      let q_id = question.id;
      let q_text = question.text;
      let selectableOption = selectableOptions.find(
        (selectableOption) => selectableOption.question_id === question.id,
      );
      let a_text = selectableOption.value;
      let matchedAnswer = new MatchedAnswer(q_id, q_text, a_text);
      matchedAnswers.push(matchedAnswer);
    });

    matchedAnswers.forEach((matchedAnswer) => {
      console.log(
        `question: ${matchedAnswer.question_text}, answer Text: ${matchedAnswer.answer_text}`,
      );
    });
    return matchedAnswers;

    console.log(selectableDictionary);
  }

  async getAnswerBySurveyId(survey_id: number) {
    // 참가자들 구하기.
    const userIds =
      await this.participatingService.getParticipatedUsersBySurveyId(survey_id);
    const uniqueUserIds = [...new Set(userIds)];

    // 질문들
    const questions = (
      await this.questionService.findBySurveyId(survey_id)
    ).sort((a, b) => a.position - b.position);

    const questionIds = questions.map((q) => q.id);
    const questionPairs = questions.map((q) => new QuestionPair(q.id, q.text));

    // 답변들
    const answers = await this.answerRepo.findBy({
      question_id: In(questionIds),
    });

    // SelectableOptions 모두 받기
    const selectableOptionIds = answers.map((a) => a.selectableOption_id);
    const uniqueSelectableOptionIds = [...new Set(selectableOptionIds)];
    const selectableOptions = await this.selectableOptionService.findByIds(
      uniqueSelectableOptionIds,
    );

    console.log(`selectableOptionIds: ${selectableOptionIds}`);

    let selectableDictionary = {}; // selectableOption, [id: value]
    selectableOptions.forEach((selectableOption) => {
      selectableDictionary[selectableOption.id] = selectableOption.value;
    });

    // userAnswers
    // let userAnswersDic = {}
    let userAnswersDic: Record<number, AnswerPair[]> = {};

    uniqueUserIds.forEach((user_id) => {
      // answer.user_id
      userAnswersDic[user_id] = [];
      console.log(`looping dic, user_id: ${user_id}`);
    });

    answers.forEach((answer) => {
      let answerText = selectableDictionary[answer.selectableOption_id];
      userAnswersDic[answer.user_id].push(
        new AnswerPair(answer.question_id, answerText),
      );
    });

    let userAnswers: UserAnswer[] = [];
    uniqueUserIds.forEach((user_id) => {
      userAnswers.push(new UserAnswer(user_id, userAnswersDic[user_id]));
    });

    return { questionPairs, userAnswers };
  }
}
