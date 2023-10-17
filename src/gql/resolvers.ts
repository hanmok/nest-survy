// import { getCompany } from './db/companies.js';
// import { getJobs } from './db/jobs.js';
// import { getUsers } from './/db/users';
import { User } from 'src/user/user.entity';
import { getAnswersBySurveyId } from './answers';
import {
  getParticipatedSurveys,
  getParticipatedSurveysByUserId,
} from './db/participatings';
import { getPostedSurveysByUserId, getPostings } from './db/postings';
import { getQuestionById, getQuestionsBySectionId } from './db/questions';
import { getSectionById, getSectionsBySurveyId } from './db/sections';
import {
  getSelectableOptionById,
  getSelectableOptionByQuestionId,
} from './db/selectableOptions';
import { getSurveyById, getSurveys } from './db/surveys';
import { getUser, getUsers } from './db/users';
import { Survey } from 'src/survey/survey.entity';
import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { Answer } from 'src/answer/answer.entity';
import { getQuestionTypeById } from './db/questionType';

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
      return await getUser(id);
    },

    users: async (_root) => {
      return await getUsers();
    },
    survey: async (_root, { id }) => {
      return await getSurveyById(id);
    },
    surveys: async (_root) => {
      return await getSurveys();
    },
    postings: async (_root, { user_id }: { user_id: number }) => {
      return await getPostedSurveysByUserId(user_id);
    },
    participatings: async (_root, { user_id }) => {
      return await getParticipatedSurveys();
    },
    sections: async (_root, { survey_id }) => {
      return await getSectionsBySurveyId(survey_id);
    },
    section: async (_root, { id }) => {
      return await getSectionById(id);
    },
    questions: async (_root, { section_id }) => {
      return await getQuestionsBySectionId(section_id);
    },
    selectable_options: async (_root, { question_id }) => {
      return await getSelectableOptionByQuestionId(question_id);
    },
    answers: async (_root, { survey_id }: { survey_id: number }) => {
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
    section: (question: Question) => getSectionById(question.section_id),
    question_type: (question: Question) =>
      getQuestionTypeById(question.question_type_id),
  },
  Answer: {
    survey: (answer: Answer) => getSurveyById(answer.survey_id),
    question: (answer: Answer) => getQuestionById(answer.question_id),
    selectable_option: (answer: Answer) =>
      getSelectableOptionById(answer.selectable_option_id),
  },
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError(message) {
  return new Error(message);
}
