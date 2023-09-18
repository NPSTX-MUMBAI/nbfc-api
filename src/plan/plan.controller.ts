import { Controller, Post, Body, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { plan } from 'src/routes/routes';
import { createAutoPay } from './dto/create-autoPay.dto';
import { PlanRepository } from './plan.repository';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(plan.Controller)
export class PlanController {
  studentService: any;
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

  @Post(plan.SetAccountStatus)
  setStatus(@Body() body: any) {
    return this.repo.setStatus(body);
  }

  @Post(plan.SetAccountStatusDisabled)
  setStatusDisable(@Body() body: any) {
    return this.planService.setDisable(body);
  }

  @Post(plan.status)
  checkAccountStatus(@Body() body: any) {
    return this.planService.checkAccountStatus(body);
  }
  

  @Post(plan.upload)
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file, @Body() body: any) {
    console.log(file);
    return await this.planService.bulkUpload(file, body);
  }

}


