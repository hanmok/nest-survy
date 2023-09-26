import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApolloServer } from '@apollo/server';
import fs from 'fs';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile, readFileSync } from 'fs';

import { getUsers } from './gql/db/users';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Survy APIs')
    .setDescription('The Survy API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`port number: ${process.env.PORT}`);
  await app.listen(process.env.PORT || 3300);
  console.log('hi');

  // const typeDefs = readFileSync('./schema.graphql', 'utf8');
  const typeDefs = `#gql
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

  console.log(typeDefs);

  const resolvers = {
    Query: {
      greeting: () => 'Hello world!',
      users: async (_root, { id }) => {
        const user = await getUsers();
        return user;
      },
    },
  };

  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(gqlServer, {
    listen: { port: 4000 },
  });
  console.log('gql started');
  // 어? 됐다..
  // asdmakjsd
}

bootstrap();
