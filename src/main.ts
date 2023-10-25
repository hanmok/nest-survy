import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ApolloServer } from '@apollo/server';
import { ApolloServer } from 'apollo-server-express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';
import { Express } from 'express';
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
  // SwaggerModule.setup('api', app, document);

  // combine two servers
  // import { ApolloServer } from 'apollo-server-express';
  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  await gqlServer.start();
  const expressApp = express();
  // gqlServer.applyMiddleware({ app: expressApp });

  gqlServer.applyMiddleware({
    app: app as unknown as Express,
    path: '/graphql',
  });

  // app.setGlobalPrefix('api');

  // Swagger address endpoint
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
