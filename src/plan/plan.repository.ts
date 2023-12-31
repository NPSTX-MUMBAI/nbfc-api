import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import {
  generateRandomString,
  generateRandomNumber,
} from 'src/constant/number';
import { createAutoPay } from './dto/create-autoPay.dto';
import { AuthService } from 'src/auth/auth.service';
import { setAccountStatus } from './dto/set-account-status.dto';
import { setStatusDisable } from './dto/set-status-disable.dto';

@Injectable()
export class PlanRepository {
  constructor(private neo: Neo4jService, private auth: AuthService) {}

  async createPlan(body: CreatePlanDto) {
    try {
      const accountId = generateRandomString(10);
      const accountNo = generateRandomNumber();
      const query = await this.neo.write(
        `merge (a:account {accountId: $accountId})
          on create set a +={
            emiDate: $emiDate,
            disbursementAmount: $disbursementAmount,
            emiAmount: $emiAmount,
            loanStartDate: $loanStartDate,
            loanEndDate: $loanEndDate,
            emiDueDate: $emiDueDate,
            address: $address,
            loanType: $loanType,
            firstName: $firstName,
            lastName: $lastName,
            mobileNo: $mobileNo,
            email: $email,
            accountNo: $accountNo,
            status: "INACTIVE"
          }
          return a`,
        {
          accountId: accountId,
          accountNo: accountNo,
          emiDate: body.emiDate,
          disbursementAmount: body.disbursementAmount,
          emiAmount: body.emiAmount,
          loanStartDate: body.loanStartDate,
          loanEndDate: body.loanEndDate,
          emiDueDate: body.emiDueDate,
          address: body.address,
          loanType: body.loanType,
          firstName: body.firstName,
          lastName: body.lastName,
          mobileNo: body.mobileNo,
          email: body.email,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('a').properties,
            status: true,
            msg: 'success',
          }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }

  async createAutoPay(data: createAutoPay) {
    try {
      const query = await this.neo.write(
        `match (a:account {accountId: $accountId}) 
      merge (a)-[:HAS_AUTOPAY]->(p:autoPay)
      on create set p +={
          startDate: $startDate,
          endDate: $endDate,
          amount: $amount,
          vpa: $vpa, 
          frequency: $frequency,
          status: "PENDING",
          debitDay: $debitDay
      }
      set a +={
        status: "PENDING"
      }
      return a, p`,
        {
          startDate: data.startDate,
          endDate: data.endDate,
          amount: data.amount,
          vpa: data.vpa,
          accountId: data.accountId,
          frequency: data.frequency,
          debitDay: data.debitDay,
          remark: data.remark,
        },
      );
      const obj = {
        startDate: data.startDate,
        endDate: data.endDate,
        amount: data.amount,
        vpa: data.vpa,
        accountId: data.accountId,
        frequency: data.frequency,
        remark: data.remark,
        loanType: query.records[0].get('a').properties.loanType,
        fullName:
          query.records[0].get('a').properties.firstName +
          ' ' +
          query.records[0].get('a').properties.lastName,
        debitDay: data.debitDay,
      };
      console.log(obj);
      const notification = await this.auth.sendNotificationToDevice(
        query.records[0].get('a').properties.token,
        'ddd',
        JSON.stringify(obj),
      );

      console.log(query.records[0].get('p').properties);

      return query.records.length > 0
        ? {
            data: query.records[0].get('p').properties,
            accountId: data.accountId,
            status: true,
            msg: 'success',
          }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }

  async setStatus(body: setAccountStatus) {
    try {
      const query = await this.neo.write(
        `match (a:account {accountId: $accountId}) -[:HAS_AUTOPAY]->(p:autoPay)
        set a.status=  $status, p.status= $status
        return a,p `,
        { accountId: body.accountId, status: body.status },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('a').properties,
            status: true,
            msg: 'success',
          }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }

  async SetToken(body: any) {
    try {
      console.log(' in set token');
      const query = await this.neo.write(
        `match (a:account) set a.token = $token return a`,
        { token: body.token },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('a').properties,
            status: true,
            msg: 'success',
          }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }

  async setDisable(body: setStatusDisable) {
    try {
      const query = await this.neo.write(
        `match (a:account {accountId: $accountId}) -[:HAS_AUTOPAY]->(p:autoPay)
        set a.status= "INACTIVE", p.status= "INACTIVE"
        return a,p `,
        { accountId: body.accountId },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('a').properties,
            status: true,
            msg: 'success',
          }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      Logger.log('error' + error, 'planRepository');
      return { res: error, status: false, msg: 'error occurred !' };
    }
  }
}
