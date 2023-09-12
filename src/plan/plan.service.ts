import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanRepository } from './plan.repository';

@Injectable()
export class PlanService {
  constructor(private plan: PlanRepository) {}
  async createPlan(body: CreatePlanDto) {
    try {
      const query = await this.plan.createPlan(body);
      return query;
    } catch (error) {
      Logger.log('error' + error, 'planService');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }

 
}
