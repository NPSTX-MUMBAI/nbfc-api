export class CreatePlanDto {
  emiDate: string;
  disbursementAmount: string;
  emiAmount: string;
  address: string;
  loanType: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  status: status;
  accountId: string;
  LoanStartDate: string;
  LoanEndDate: string;
  emiDueDate: string;
}


export enum status {
    'INACTIVE' = 'INACTIVE',
    'ACTIVE' = 'ACTIVE',
    'PENDING' = 'PENDING',
    'REJECTED' = 'REJECTED',
  }