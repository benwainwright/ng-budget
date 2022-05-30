import { ConcretePayment } from './concrete-payment';

export interface PotPlan {
  startingBalance: number;
  payments: ConcretePayment[];
}
