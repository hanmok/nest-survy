import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ApolloServer } from '@apollo/server';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';
import { Express } from 'express';
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Survy APIs')
    .setDescription('The Survy API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  await gqlServer.start();
  const expressApp = express();

  gqlServer.applyMiddleware({
    app: app as unknown as Express,
    path: '/graphql',
  });

  // Swagger address endpoint
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
  // await app.listen(3000);
}

bootstrap();
