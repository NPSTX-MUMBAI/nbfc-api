import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  Logger.log('localHost :' + process.env.LOCALHOST, 'main.ts');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.LOCALHOST);
}
bootstrap();
