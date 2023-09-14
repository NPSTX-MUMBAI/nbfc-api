import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { plan } from 'src/routes/routes';
import { createAutoPay } from './dto/create-autopay.dto';
import { PlanRepository } from './plan.repository';

@Controller(plan.Controller)
export class PlanController {
  constructor(private readonly planService: PlanService, private repo: PlanRepository) {}

  @Post(plan.CreateAccount)
  createPlan(@Body() body: CreatePlanDto) {
    return this.planService.createPlan(body);
  }

  @Post(plan.CreateAutoPay)
  createAutoPay(@Body() body: createAutoPay) {
    return this.planService.CreateAutoPay(body);
  }

  @Get(plan.GetAccount)
  getAccount() {
    return this.planService.GetAccount();
  }

  @Post('test')
  setToken(@Body() body: any) {
    return this.repo.SetToken(body);
  }

  @Post('set/status')
  setStatus(@Body() body: any) {
    return this.repo.setStatus(body);
  }
  
}
