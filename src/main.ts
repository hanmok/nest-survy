import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ApolloServer } from '@apollo/server';
import { ApolloServer } from 'apollo-server-express';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { resolvers } from './resolvers.js';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';
// import { Express } from 'express';
// const express = require('express')
// import express from 'express';
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Survy APIs')
    .setDescription('The Survy API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // await app.listen(process.env.PORT || 3000);

  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  await gqlServer.start();

  const expressApp = express();
  gqlServer.applyMiddleware({ app: expressApp });

  await app.listen(process.env.PORT || 3000);

  // console.log(`port: ${process.env.port}`)
  // const gqlPort = Number.parseInt(process.env.PORT) || 3000;

  // const { url } = await startStandaloneServer(gqlServer, {
  //   listen: { port: gqlPort },
  // });

  // console.log('gql started, url:', url); // http://localhost:4000/
}

bootstrap();
