import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanRepository } from './plan.repository';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class PlanService {
  constructor(private plan: PlanRepository, private common: CommonService) {}
  async createPlan(body: CreatePlanDto) {
    try {
      const query = await this.plan.createPlan(body);
      return query;
    } catch (error) {
      Logger.log('error' + error, 'planService');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }
  async GetAccount() {
    try {
      const Query = await this.common.matchNode('account');
      return Query;
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }
}
