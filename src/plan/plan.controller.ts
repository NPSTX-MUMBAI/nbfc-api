import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { plan } from 'src/routes/routes';
import { createAutoPay } from './dto/create-autopay.dto';

@Controller(plan.Controller)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post(plan.CreateAccount)
  createPlan(@Body() body: CreatePlanDto) {
    return this.planService.createPlan(body);
  }

  @Post(plan.CreateAutoPay)
  createAutoPay(@Body() body: createAutoPay) {
    return this.planService.CreateAutoPay(body);
  }

  @Get(plan.GetAccount)
  GetAccount() {
    return this.planService.GetAccount();
  }
}
