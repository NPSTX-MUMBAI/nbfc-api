import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { plan } from 'src/routes/routes';

@Controller(plan.Controller)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post(plan.CreateAccount)
  createPlan(@Body() body: CreatePlanDto) {
    return this.planService.createPlan(body);
  }

  @Get(plan.GetAccount)
  GetAccount() {
    return this.planService.GetAccount();
  }

 
}
