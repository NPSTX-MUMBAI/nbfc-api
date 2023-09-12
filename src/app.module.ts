import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [AuthModule, PlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
