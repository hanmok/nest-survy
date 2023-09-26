// import { getCompany } from './db/companies.js';
// import { getJobs } from './db/jobs.js';
// import { getUsers } from './/db/users';
import { getParticipatedSurveysByUserId } from './db/participatings';
import { getPostingsByUserId, getPostings } from './db/postings';
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
    postings: async (_root, { user_id }) => {
      // const postings = await getPostingByUserId(user_id);
      // if (postings.length === 0) {
      //   throw notFoundError('No posting found with id ' + user_id);
      // }
      // return postings;
      return await getPostings();
    },
  },
  User: {
    postedSurveys: (user) => getPostingsByUserId(user.id),
    participatedSurveys: (user) => getParticipatedSurveysByUserId(user.id),
  },
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError(message) {
  return new Error(message);
}
