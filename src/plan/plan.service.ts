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
      if (query.status) {
        const setToken = await this.plan.SetToken({
          token:
            'cy4TY443TBGA9fphzYznYQ:APA91bEbIO2MflwmkFS0tBg_s3bYykpYIRBRS0PpLbSTp1wVbobu63sjLwbFQUrWDglDaxaT5gwMQ3aOSuyzkqZCVP878H1mLEXkCYX40aoGXFCc1sJ8FgSQyeqE2Wg3NTCu__s_H3Dx',
        });
      }

      return query;
    } catch (error) {
      Logger.log(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async GetAccount() {
    try {
      const Query = await this.common.matchNode('account');
      return Query;
    } catch (error) {
      Logger.log(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
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
          startDate: body.startDate,
          endDate: body.endDate,
          amount: body.amount,
          vpa: body.vpa,
          accountId: body.accountId,
          frequency: body.frequency,
        });
        return query;
      } else {
        return { data: null, status: false, msg: response.NotFound };
      }
    } catch (error) {
      Logger.log(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async setStatus(body: any) {
    try {
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      if (match.status) {
        const query = await this.plan.setStatus(body);
        return query;
      } else {
        return { data: null, status: false, msg: response.NotFound };
      }
    } catch (error) {
      Logger.log(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }
}
