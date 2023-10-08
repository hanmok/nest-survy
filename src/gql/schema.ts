export const typeDefs = `#gql
type Query {
  jobs: [Job!]
  users: [User!]
  surveys: [Survey!]
  user(id: ID!): User
  postings(user_id: ID!): [Posting]
  participatings(user_id: ID!): [Participating]
  survey(id: ID!): Survey
  selectableOptions(question_id: ID!): [SelectableOption]
  sections(survey_id: ID!): [Section!]
  section(id: ID!): Section!
  questions(section_id: ID!): [Question!]
  greeting: String
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

type Section { 
	id: ID!
	survey: Survey
	title: String
	reward: Int
	questions: [Question]
  sequence: Int
}

type Question { 
	id: ID!
	section: Section!
	position: Int!
	text: String!
  question_type_id: Int!
	survey: Survey
	selectableOptions: [SelectableOption]
}

type SelectableOption {
	id: ID!
	question: Question!
	position: Int!
	value: String!
	section: Section!
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
reward: Int
code: String
is_public: Int
is_completed: Int
sections: [Section]
}

`;
