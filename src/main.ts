// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// // import { ApolloServer } from '@apollo/server';
// import { ApolloServer } from 'apollo-server-express';
// import { startStandaloneServer } from '@apollo/server/standalone';
// // import { resolvers } from './resolvers.js';
// import { resolvers } from './gql/resolvers';
// import { typeDefs } from './gql/schema';
// // import { Express } from 'express';
// // const express = require('express')
// // import express from 'express';
// import { Express } from 'express';
// const express = require('express');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // const configService = app.get(ConfigService);
//   // Swagger
//   const config = new DocumentBuilder()
//     .setTitle('Survy APIs')
//     .setDescription('The Survy API description')
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   // SwaggerModule.setup('api', app, document);

//   // combine two servers
//   // import { ApolloServer } from 'apollo-server-express';
//   const gqlServer = new ApolloServer({ typeDefs, resolvers });
//   await gqlServer.start();
//   const expressApp = express();
//   // gqlServer.applyMiddleware({ app: expressApp });

//   gqlServer.applyMiddleware({
//     app: app as unknown as Express,
//     path: '/graphql',
//   });

//   app.setGlobalPrefix('api');
//   SwaggerModule.setup('api', app, document);

//   await app.listen(process.env.PORT || 3000);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';
import { Express } from 'express';
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Survy APIs')
    .setDescription('The Survy API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Apollo Server 설정
  const gqlServer = new ApolloServer({ typeDefs, resolvers });
  await gqlServer.start();

  // Express 애플리케이션 생성
  const expressApp = express();

  // GraphQL 미들웨어를 Express 애플리케이션에 적용
  gqlServer.applyMiddleware({
    app: expressApp,
    path: '/graphql',
  });

  // NestJS 애플리케이션에 Express 애플리케이션을 연결
  app.use('/api', expressApp);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
