import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env, paginateResponse } from './config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Env.PORT || 6060;

  app.enableCors({
    credentials: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.use(
    '/docs*',
    basicAuth({
      challenge: true,
      users: {
        path: 'finder',
      },
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Path-Finder Resturant Service')
    .setDescription('Path-Finder Resturant Service API Endpoint')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  //apply validation pipe
  app.useGlobalPipes(new ValidationPipe());

  //apply pagination global middleware
  app.use(paginateResponse);

  await app.listen(PORT, '0.0.0.0');
  console.log(
    'Path-Finder Resturant Service listening to http://localhost:' + PORT,
  );
}
bootstrap();
