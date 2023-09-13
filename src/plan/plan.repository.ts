import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import {
  generateRandomString,
  generateRandomNumber,
} from 'src/constant/number';

@Injectable()
export class PlanRepository {
  constructor(private neo: Neo4jService) {}

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
            startDate: $startDate,
            endDate: $endDate,
            dueDate: $dueDate,
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
          startDate: body.startDate,
          endDate: body.endDate,
          dueDate: body.dueDate,
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
}
