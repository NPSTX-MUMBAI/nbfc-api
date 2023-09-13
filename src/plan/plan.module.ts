import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PlanRepository, CommonService]
})
export class PlanModule {}
