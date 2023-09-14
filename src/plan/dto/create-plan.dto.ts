export class CreatePlanDto {
  emiDate: string;
  disbursementAmount: string;
  emiAmount: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  address: string;
  loanType: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  status: status;
  accountId: string;
}


export enum status {
    'INACTIVE' = 'INACTIVE',
    'ACTIVE' = 'ACTIVE',
    'PENDING' = 'PENDING',
  }