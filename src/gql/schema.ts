export const typeDefs = `#gql
type Query {
  jobs: [Job!]
  users: [User!]
}

type Company {
  id: ID!
  name: String!
  description: String
}

type Job {
  id: ID!
  date: String!
  title: String!
  company: Company!
  description: String
}

type User {
  id: ID!
  username: String!
}

type Query {
  greeting: String
}
`;
