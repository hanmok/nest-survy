// import { getCompany } from './db/companies.js';
// import { getJobs } from './db/jobs.js';
// import { getUsers } from './/db/users';
import { getUsers } from './db/users';

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
    users: async (_root, { id }) => {
      const user = await getUsers();
      return user;
    },
  },
};

// function toIsoDate(value) {
//   return value.slice(0, 'yyyy-mm-dd'.length);
// }
