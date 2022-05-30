import { PotPlan } from './pot-plan';

export interface Budget {
  fromDate: Date;
  toDate: Date;
  potPlans: PotPlan[];
}
