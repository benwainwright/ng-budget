import { PotPlan } from './pot-plan';

export interface Budget {
  startDate: Date;
  endDate: Date;
  potPlans: PotPlan[];
}
