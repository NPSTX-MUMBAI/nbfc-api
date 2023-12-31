import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PlanRepository } from './plan.repository';
import { CommonService } from 'src/common/common.service';
import { response } from 'src/filters/response';
import { createAutoPay } from './dto/create-autoPay.dto';
import * as XLSX from 'xlsx';
import {
  generateRandomString,
  generateRandomNumber,
} from 'src/constant/number';
import { setAccountStatus } from './dto/set-account-status.dto';
import { checkAccountStatus } from './dto/check-autoPay-status.dto';
import { setStatusDisable } from './dto/set-status-disable.dto';

@Injectable()
export class PlanService {
  constructor(private plan: PlanRepository, private common: CommonService) {}
  async createPlan(body: CreatePlanDto) {
    Logger.verbose('data :' + body, 'planService');
    try {
      const query = await this.plan.createPlan(body);
      Logger.log('query : ' + query, 'planService');
      if (query.status) {
        Logger.log('Setting up Token : ' + query.status, 'planService');
        const setToken = await this.plan.SetToken({
          token:
            'eQz0N9OHSI2rsvpmMdh55z:APA91bHcviPTPqJ4ZKxXnZv5JKb3V_bGcZ5cVPs3jooyg4V_v5uKNwE5tn4yZUlOg6dMkGlpf5AIbDjhpzdR4bpDvlV69K-RIhwLuykhRxtdhkZPfNCmzYQA3fEh07AtMqp0p5JJ04nl',
        });
      }

      return query;
    } catch (error) {
      Logger.error(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async GetAccount() {
    try {
      const Query = await this.common.matchNode('account');
      Logger.log('status :' + Query.status, 'planService');
      return Query;
    } catch (error) {
      Logger.error(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async CreateAutoPay(body: createAutoPay) {
    try {
      Logger.verbose('accountId :' + body.accountId, 'planService');
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      Logger.log('match status :' + match.status, 'planService');
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
        Logger.warn('match status :' + match.status, 'planService');
        return { data: null, status: false, msg: response.NotFound };
      }
    } catch (error) {
      Logger.error(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async setStatus(body: setAccountStatus) {
    try {
      Logger.verbose('accountId :' + body.accountId, 'planService');
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      Logger.log('match status :' + match.status, 'planService');
      if (match.status) {
        const query = await this.plan.setStatus(body);
        Logger.log('query status : ' + query.status, 'planService');
        return query;
      } else {
        Logger.warn('match status :' + match.status, 'planService');
        return { data: null, status: false, msg: response.NotFound };
      }
    } catch (error) {
      Logger.error(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async checkAccountStatus(body: checkAccountStatus) {
    try {
      Logger.verbose('accountId :' + body.accountId, 'planService');
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      Logger.log('match status :' + match.status, 'planService');
      return { status: match.data.status, msg: response.Success };
    } catch (error) {
      Logger.error(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }

  async bulkUpload(file: any, body: any) {
    try {
      Logger.verbose(file, 'data');
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any[] = XLSX.utils.sheet_to_json(worksheet);
      let count = 0;

      Logger.verbose(data, 'found');
      for (const item of data) {
        const accountId = generateRandomString(10);
        const accountNo = generateRandomNumber();
        // const loanStartDate: string = item.loanStartDate;
        // const loanEndDate: string = item.loanEndDate;
        // const emiDueDate: string = item.emiDueDate;
        // const emiDate: string = item.emiDate;
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
        count++;
      }
      if (count == data.length) {
        return { msg: response.Success, status: true };
      }
    } catch (error) {
      Logger.error(response.Error);
      return { res: error, status: false, msg: response.Error };
    }
  }


  async setDisable(body: setStatusDisable) {
    try {
      Logger.verbose('accountId :' + body.accountId, 'planService');
      const match = await this.common.match(
        'account',
        'accountId',
        body.accountId,
      );
      Logger.log('match status :' + match.status, 'planService');
      if (match.status) {
        const query = await this.plan.setDisable(body);
        Logger.log('query status : ' + query.status, 'planService');
        return query;
      } else {
        Logger.warn('match status :' + match.status, 'planService');
        return { data: null, status: false, msg: response.NotFound };
      }
    } catch (error) {
      Logger.error(response.Error + error, 'planService');
      return { res: error, status: false, msg: response.Error };
    }
  }
}
