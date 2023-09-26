// import { getCompany } from './db/companies.js';
// import { getJobs } from './db/jobs.js';
// import { getUsers } from './/db/users';
import {
  getParticipatedSurveys,
  getParticipatedSurveysByUserId,
} from './db/participatings';
import { getPostedSurveysByUserId, getPostings } from './db/postings';
import { getQuestionsBySectionId } from './db/questions';
import { getSectionById, getSectionsBySurveyId } from './db/sections';
import { getSelectableOptionByQuestionId } from './db/selectableOptions';
import { getSurvey, getSurveys } from './db/surveys';
import { getUser, getUsers } from './db/users';

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
      return await getSurvey(id);
    },
    surveys: async (_root) => {
      return await getSurveys();
    },
    postings: async (_root, { user_id }: { user_id: string }) => {
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
    selectableOptions: async (_root, { question_id }) => {
      return await getSelectableOptionByQuestionId(question_id);
    },
  },
  User: {
    postedSurveys: (user) => getPostedSurveysByUserId(user.id),
    participatedSurveys: (user) => getParticipatedSurveysByUserId(user.id),
  },
  Survey: {
    sections: (survey) => getSectionsBySurveyId(survey.id),
  },
  Section: {
    questions: (section) => getQuestionsBySectionId(section.id),
  },
  Question: {
    selectableOptions: (question) =>
      getSelectableOptionByQuestionId(question.id),
  },
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError(message) {
  return new Error(message);
}
