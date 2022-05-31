import { ConcretePayment } from './concrete-payment';
import { PotPlan } from './pot-plan';

export interface PaymentPlan {
  potPlans: { payments: ConcretePayment[] }[];
}

export interface Budget {
  startDate: Date;
  endDate: Date;
  potPlans: PotPlan[];
  surplus: number;
}
