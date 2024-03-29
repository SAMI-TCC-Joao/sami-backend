/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Sami API')
    .setDescription('Projeto de TCC.')
    .setVersion('1.0.2')
    .addTag('Status')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Classes')
    .addTag('Classes-Relation')
    .addTag('Indicators')
    .addTag('Forms')
    .addTag('Questions')
    .addTag('Evaluations')
    .addTag('Responses')
    .addTag('Groups')
    .addTag('Methodologies')
    .addTag('Public')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`Application is running on: ${port}`);
}
bootstrap();
