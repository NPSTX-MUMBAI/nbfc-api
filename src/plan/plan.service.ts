import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanRepository } from './plan.repository';
import { CommonService } from 'src/common/common.service';
import { response, serviceConstants } from 'src/filters/response';
import { createAutoPay } from './dto/create-autopay.dto';
import * as XLSX from 'xlsx';
import { generateRandomString, generateRandomNumber } from 'src/constant/number';

@Injectable()
export class PlanService {
  constructor(private plan: PlanRepository, private common: CommonService) {}
  async createPlan(body: CreatePlanDto) {
    try {
      const query = await this.plan.createPlan(body);
      if (query.status) {
        const setToken = await this.plan.SetToken({
          token:
            'eQz0N9OHSI2rsvpmMdh55z:APA91bHcviPTPqJ4ZKxXnZv5JKb3V_bGcZ5cVPs3jooyg4V_v5uKNwE5tn4yZUlOg6dMkGlpf5AIbDjhpzdR4bpDvlV69K-RIhwLuykhRxtdhkZPfNCmzYQA3fEh07AtMqp0p5JJ04nl',
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
          debitDay: body.debitDay,
          remark: body.remark,
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

  async checkAccountStatus(body: any) {
    try {
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      return { status: match.data.status };
    } catch (error) {
      return error;
    }
  }

  async bulkUpload(file: any, body: any) {
    try {
      Logger.verbose(file, 'data');
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any[] = XLSX.utils.sheet_to_json(worksheet);
      let count = 0;

      Logger.verbose(data, body, 'found');
      for (const item of data) {
          const accountId = generateRandomString(10);
          const accountNo = generateRandomNumber();
          const query2 = await this.plan.createPlan({
            accountId: accountId,
            accountNo: accountNo,
            emiDate: item.emiDate,
            disbursementAmount: item.disbursementAmount,
            emiAmount: item.emiAmount,
            loanStartDate: item.loanStartDate,
            loanEndDate: item.loanEndDate,
            emiDueDate: item.emiDueDate,
            address: item.address,
            loanType: item.loanType,
            firstName: item.firstName,
            lastName: item.lastName,
            mobileNo: item.mobileNo,
            email: item.email,
          });
          return query2
        }
        if (count == data.length) {
          return { msg: response.Success, status: true };
        }
    } catch (error) {
      Logger.error(response.Error);
      return error;
    }
  }
}
