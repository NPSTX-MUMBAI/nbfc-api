import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanRepository } from './plan.repository';
import { CommonService } from 'src/common/common.service';
import { response } from 'src/filters/response';
import { createAutoPay } from './dto/create-autopay.dto';

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

  async CreateAutoPay(body: createAutoPay) {
    try {
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      if (match.status) {
        const query = this.plan.createAutoPay({
          startDate: match.data.startDate,
          endDate: match.data.endDate,
          amount: body.amount,
          upiId: body.upiId,
          vpa: body.vpa,
          accountId: body.accountId,
        });
        return query;
      } else {
        return { data: null, status: false, msg: response.NotFound };
      }
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }
}
