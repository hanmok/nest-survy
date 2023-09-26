import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApolloServer } from '@apollo/server';
// import fs from 'fs';
const fs = require('fs');
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile, readFileSync } from 'fs';
// import { resolvers } from './resolvers.js';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';

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

  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(gqlServer, {
    listen: { port: 4000 },
  });
  console.log('gql started, url:', url); // http://localhost:4000/
}

bootstrap();
