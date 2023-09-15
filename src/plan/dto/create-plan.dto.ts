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
  status?: status;
  accountId: string;
  loanStartDate: string;
  loanEndDate: string;
  emiDueDate: string;
  accountNo: number;
}


export enum status {
    'INACTIVE' = 'INACTIVE',
    'ACTIVE' = 'ACTIVE',
    'PENDING' = 'PENDING',
    'REJECTED' = 'REJECTED',
  }