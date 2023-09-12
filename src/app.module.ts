import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PlanModule } from './plan/plan.module';
import { Neo4jModule } from 'nest-neo4j';
import { environment } from './env/environment';
require('dotenv').config();
Logger.log('neo4j PORT :' + process.env.PORT, 'appModule');
Logger.log('neo4j HOST :' + process.env.HOST, 'appModule');
Logger.log('neo4j User Name :' + environment.username, 'appModule');


@Module({
  imports: [
    AuthModule,
    PlanModule,
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.HOST,
      port: process.env.PORT,
      username: environment.username,
      password: process.env.PASSWORD,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
