export const typeDefs = `#gql
type Query {
  jobs: [Job!]
  users: [User!]
  surveys: [Survey!]
  user(id: ID!): User
  postings(user_id: ID!): [Posting]
  participatedSurveysByUserId(user_id: ID!): [Survey]
  participatingsBySurveyId(survey_id: ID!): [Participating]
  survey(id: ID!): Survey
  selectable_options(question_id: ID!): [SelectableOption]
  sections(survey_id: ID!): [Section!]
  section(id: ID!): Section!
  questions(section_id: ID!): [Question!]
  greeting: String
  answers(survey_id: ID!): [Answer!]
}

type QuestionType { 
  id: ID!
  name: String
}

type Posting { 
	id: ID
	user: User!
	survey: Survey!
  surveys: [Survey]
}

type Participating { 
	id: ID!
	user: User!
	survey: Survey!
  sequence: Int
}

type Section { 
	id: ID!
	survey: Survey!
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
  question_type: QuestionType!
	survey: Survey
	selectable_options: [SelectableOption]
}

type SelectableOption {
	id: ID!
	question: Question!
	position: Int!
	value: String!
	section: Section!
  is_extra: Int!
}

type User {
  id: ID!
  username: String!
  collected_reward: Float!
  birth_date: String
  nickname: String
  is_male: Int
  device_token: String
  posted_surveys: [Survey!]
  participated_surveys: [Survey!]
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

type Answer { 
  id: ID!
  question: Question!
  selectable_option: SelectableOption
  user: User
  survey: Survey!
  answer_text: String
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
`;
