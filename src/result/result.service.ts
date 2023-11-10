import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answer/answer.entity';
import { Participating } from 'src/participating/participating.entity';
import { Question } from 'src/question/question.entity';
import { Section } from 'src/section/section.entity';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';
import { User } from 'src/user/user.entity';
import { formateDate } from 'src/util/DateFormatter';
import { Dictionary } from 'src/util/SetDictionary';
import logObject from 'src/util/logObject';
import { Repository } from 'typeorm';

export interface QuestionOrder {
  id: number;
  position: number;
  text: string;
}

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Answer) private answerRepo: Repository<Answer>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(SelectableOption)
    private selectableOptionRepo: Repository<SelectableOption>,
    @InjectRepository(Participating)
    private participatingRepo: Repository<Participating>,
  ) {}

  async exportExcel(survey_id: number) {
    const [answers, questions, sections, participatings] = await Promise.all([
      this.answerRepo.find({ where: { survey_id } }),
      this.questionRepo.find({ where: { survey_id } }),
      this.sectionRepo.find({ where: { survey_id } }),
      this.participatingRepo.find({ where: { survey_id } }),
    ]);

    // Get Related SelectableOptions
    const selectableOptions: SelectableOption[] = [];

    const promises = sections.map(async (s) => {
      const selectableOps = await this.selectableOptionRepo.find({
        where: { section_id: s.id },
      });
      return selectableOps;
    });

    const results = await Promise.all(promises);
    results.forEach((eachResult) => {
      selectableOptions.push(...eachResult);
    });
    const soDic: Dictionary<string> = {};
    selectableOptions.forEach((so) => {
      soDic[so.id] = so.value;
    });

    /*
    questions.sort((a, b) => a.section_id)
    먼저, Section 별로 나눠야함. 나뉘었다고 치자.
    questions.sort((a, b) => {
    })
	*/

    const questionInOrder: QuestionOrder[] = questions
      .map((q) => {
        // {q.id, q.position, q.text}
        const questionOrder: QuestionOrder = {
          id: q.id,
          position: q.position,
          text: q.text,
        };
        return questionOrder;
      })
      .sort((a, b) => a.position - b.position);

    //   questionInOrder.unshift('')
    const userDictionary: Dictionary<Dictionary<string>> = {};

    // const userIds = participatings.map((p) => p.user_id)

    participatings.forEach((p) => {
      userDictionary[p.user_id] = {};
    });

    answers.forEach((a) => {
      if (userDictionary[a.user_id][a.question_id]) {
        userDictionary[a.user_id][a.question_id].concat(
          `, ${soDic[a.selectable_option_id]}`,
        );
      } else {
        if (a.answer_text === null) {
          userDictionary[a.user_id][a.question_id] =
            soDic[a.selectable_option_id];
        } else {
          userDictionary[a.user_id][a.question_id] = a.answer_text;
        }
      }
    });

    let eachRowData: string[] = [];
    const userResponses: string[][] = [];

    // TODO: 마지막에, UserId 대신 TimeStamp 로 바꾸기.
    participatings.forEach((p) => {
      logObject('participating: ', p);
      const createdAt = formateDate(p.created_at);
      //   eachRowData.push(`${p.user_id} + ${createdAt}`);
      eachRowData.push(createdAt);
      questionInOrder.forEach((q) => {
        eachRowData.push(userDictionary[p.user_id][q.id]);
      });
      logObject('appended rowData:', eachRowData);
      logObject('totalData', userResponses);
      userResponses.push(eachRowData);
      eachRowData = [];
    });

    logObject('userDictionary:', userDictionary);

    return { questionInOrder, userResponses };
  }
}
