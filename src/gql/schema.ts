export const typeDefs = `#gql
type Query {
  jobs: [Job!]
  users: [User!]
  surveys: [Survey!]
  user(id: ID!): User
  postings(user_id: ID!): [Posting]
  participatings(user_id: ID!): [Participating]
  survey(id: ID!): Survey
}

type Posting { 
	id: ID
	user_id: ID
	survey_id: ID
}

type Participating { 
	id: ID
	user_id: ID
	survey_id: ID
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
  collected_reward: Float!
  birth_date: String
  nickname: String
  is_male: Int
  device_token: String
  postedSurveys: [Survey!]
  participatedSurveys: [Survey!]
}

type Survey { 
id: ID!
title: String!
current_participation: Int!
participation_goal: Int!
created_at: String
ended_at: String
reward_range: String
code: String
is_public: Int
is_completed: Int

}


type Query {
  greeting: String
}
`;
