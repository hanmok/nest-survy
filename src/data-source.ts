// // import 'reflect-metadata'
// import { DataSource } from "typeorm";
// import { User } from "./user/user.entity";
// import { Genre } from "./genre/genre.entity";
// import { Question } from "./question/question.entity";
// import { QuestionType } from "./question-type/questionType.entity";
// import { Response } from "./response/response.entity";
// import { Section } from "./section/section.entity";
// import { SectionBridge } from "./section-bridge/section-bridge.entity";
// import { Segment } from "./segment/segment.entity";
// import { selectableOption } from "./selectable-option/selectable-option.entity";
// import { Survey } from "./survey/survey.entity";

// export const AppDataSource = new DataSource({ 
// 	type: 'mysql',
// 	host: process.env.DB_HOST,
// 	port: parseInt(process.env.DB_PORT),
// 	username: process.env.DB_USERNAME,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// 	synchronize: true, 
// 	entities: [User, Genre, Question, QuestionType, Response, Section, SectionBridge, Segment, selectableOption, Survey]
// })