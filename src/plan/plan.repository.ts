import { Injectable, Logger } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { generateRandomString } from 'src/constant/number';

@Injectable()
export class PlanRepository {
  constructor(private neo: Neo4jService) {}

  async createPlan(body: CreatePlanDto) {
    try {
      const accountId = generateRandomString(10);
      const query = await this.neo.write(
        `merge (a:account {accountId: $accountId})
          on create set a +={
              emiDate: $emiDate,
              disbursementAmount:$disbursementAmount,
              approved: $approved,
              emi: $emi,
              autoPayStatus: $autoPayStatus
          }
          return a`,
        {
          accountId: accountId,
          emiDate: body.emiDate,
          disbursementAmount: body.disbursementAmount,
          approved: body.approved,
          emi: body.emi,
          autoPayStatus: body.autoPayStatus,
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
