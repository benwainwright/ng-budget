import { Injectable } from '@angular/core';
import { lastValueFrom, BehaviorSubject, Observable, take } from 'rxjs';
import { getDates } from '../lib/get-dates';
import { Budget } from '../types/budget';
import { Pot } from '../types/pot';
import { RecurringPayment } from '../types/recurring-payment';
import { PotsService } from './pots.service';
import { RecurringPaymentsService } from './recurring-payments.service';

interface InitialBudgetInput {
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(
    private recurringPayments: RecurringPaymentsService,
    private pots: PotsService
  ) {}

  private budgets = new BehaviorSubject<Budget[]>([]);

  async createInitialBudget(input: InitialBudgetInput) {
    const payments = await lastValueFrom(
      this.recurringPayments.getPayments().pipe(take(1))
    );
    const pots = await lastValueFrom(this.pots.getPots().pipe(take(1)));
    this.generateBudget(input, payments, pots);
  }

  private generateBudget(
    input: InitialBudgetInput,
    payments: RecurringPayment[],
    pots: Pot[]
  ) {
    const plans = pots.map((pot) => ({
      id: pot.id,
      balance: pot.balance,
      name: pot.name,
      payments: payments
        .filter((payment) => payment.potId === pot.id)
        .flatMap((payment) =>
          getDates(payment.when, input.endDate, input.startDate).map(
            (date, index) => ({
              id: `${payment.id}-${index}`,
              name: payment.name,
              when: date,
              amount: payment.amount,
            })
          )
        ),
    }));

    const budget = {
      startDate: input.startDate,
      endDate: input.endDate,
      potPlans: plans,
    };

    const budgets = this.budgets.value;
    this.budgets.next([...budgets, budget]);
  }

  getBudget(): Observable<Budget[]> {
    return this.budgets.asObservable();
  }
}
