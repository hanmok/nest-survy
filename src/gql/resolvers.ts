// import { getCompany } from './db/companies.js';
// import { getJobs } from './db/jobs.js';
import { User } from 'src/user/user.entity';
import { getAnswersBySurveyId } from './db/answers';
import {
  getParticipatings,
  getParticipatedSurveysByUserId,
  getParticipatingsBySurveyId,
} from './db/participatings';
import { getPostedSurveysByUserId, getPostings } from './db/postings';
import {
  getQuestionById,
  getQuestionsBySectionId,
  questionLoader,
} from './db/questions';
import {
  getSectionById,
  getSectionsBySurveyId,
  sectionLoader,
} from './db/sections';
import {
  getSelectableOptionById,
  getSelectableOptionByQuestionId,
  selectableOptionLoader,
} from './db/selectableOptions';
import {
  getAvailableSurveys,
  getSurveyById,
  getSurveys,
  surveyLoader,
} from './db/surveys';
import { getUserById, getUsers, userLoader } from './db/users';
import { Survey } from 'src/survey/survey.entity';
import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { Answer } from 'src/answer/answer.entity';
import { getQuestionTypeById, questionTypeLoader } from './db/questionType';
import { Participating } from 'src/participating/participating.entity';

export const resolvers = {
  //   Query: {
  //     jobs: () => getJobs(),
  //   },

  //   Job: {
  //     company: (job) => getCompany(job.companyId),
  //     date: (job) => toIsoDate(job.createdAt),
  //   },

  Query: {
    greeting: () => 'Hello world!',
    user: async (_root, { id }) => {
      // return await getUserById(id);
      return userLoader.load(id.toString());
    },

    users: async (_root) => {
      return await getUsers();
    },
    survey: async (_root, { id }) => {
      // return await getSurveyById(id);
      return surveyLoader.load(id.toString());
    },
    surveys: async (_root) => {
      return await getSurveys();
    },
    available_surveys: async (_root, { user_id }: { user_id: number }) => {
      // return await getSurveys();
      return await getAvailableSurveys(user_id);
    },
    postings: async (_root, { user_id }: { user_id: number }) => {
      return await getPostedSurveysByUserId(user_id);
    },
    participatedSurveysByUserId: async (
      _root,
      { user_id }: { user_id: number },
    ) => {
      return await getParticipatedSurveysByUserId(user_id);
    },
    participatings: async (_root, { survey_id }: { survey_id: number }) => {
      return await getParticipatingsBySurveyId(survey_id);
    },
    sections: async (_root, { survey_id }) => {
      return await getSectionsBySurveyId(survey_id);
    },
    section: async (_root, { id }) => {
      // return await getSectionById(id);
      return sectionLoader.load(id.toString());
    },
    questions: async (_root, { section_id }) => {
      return await getQuestionsBySectionId(section_id);
    },
    selectable_options: async (_root, { question_id }) => {
      return await getSelectableOptionByQuestionId(question_id);
    },
    answers: async (_root, { survey_id }: { survey_id: string }) => {
      return await getAnswersBySurveyId(survey_id);
    },
  },
  User: {
    posted_surveys: (user: User) => getPostedSurveysByUserId(user.id),
    participated_surveys: (user: User) =>
      getParticipatedSurveysByUserId(user.id),
  },
  Survey: {
    sections: (survey: Survey) => getSectionsBySurveyId(survey.id),
  },
  Section: {
    questions: (section: Section) => getQuestionsBySectionId(section.id),
  },
  Question: {
    selectable_options: (question: Question) =>
      getSelectableOptionByQuestionId(question.id),
    // section: (question: Question) => getSectionById(question.section_id),
    section: (question: Question) =>
      sectionLoader.load(question.section_id.toString()),
    question_type: (question: Question) =>
      questionTypeLoader.load(question.question_type_id.toString()),
    // getQuestionTypeById(question.question_type_id),
  },
  Answer: {
    // survey: (answer: Answer) => getSurveyById(answer.survey_id),
    survey: (answer: Answer) => surveyLoader.load(answer.survey_id.toString()),
    // question: (answer: Answer) => getQuestionById(answer.question_id),
    question: (answer: Answer) =>
      questionLoader.load(answer.question_id.toString()),
    selectable_option: (answer: Answer) =>
      // getSelectableOptionById(answer.selectable_option_id),
      selectableOptionLoader.load(answer.selectable_option_id),
    // user: (answer: Answer) => getUserById(answer.user_id),
    user: (answer: Answer) => userLoader.load(answer.user_id.toString()),
  },
  Participating: {
    user: (participating: Participating) =>
      userLoader.load(participating.user_id.toString()),
    survey: (participating: Participating) =>
      surveyLoader.load(participating.survey_id.toString()),
    // getSurveyById(participating.survey_id),
  },
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError(message) {
  return new Error(message);
}

// before
// [db] select * from `question` where `id` = 456904 limit 1
// [db] select * from `selectable_option` where `id` = 469404 limit 1
// [db] select * from `question` where `id` = 456914 limit 1
// [db] select * from `selectable_option` where `id` = 469444 limit 1
// [db] select * from `question` where `id` = 456924 limit 1
// [db] select * from `selectable_option` where `id` = 469464 limit 1
// [db] select * from `question` where `id` = 456904 limit 1
// [db] select * from `selectable_option` where `id` = 469414 limit 1
// [db] select * from `question` where `id` = 456914 limit 1
// [db] select * from `selectable_option` where `id` = 469434 limit 1
// [db] select * from `selectable_option` where `id` = 469464 limit 1
