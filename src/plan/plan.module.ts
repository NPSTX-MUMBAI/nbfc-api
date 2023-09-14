import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { CommonService } from 'src/common/common.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PlanRepository, CommonService, AuthService],
})
export class PlanModule {}
