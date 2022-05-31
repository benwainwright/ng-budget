import { Injectable } from '@angular/core';
import { lastValueFrom, BehaviorSubject, Observable, take } from 'rxjs';
import { getDates } from '../lib/get-dates';
import { Budget, PaymentPlan } from '../types/budget';
import { Pot } from '../types/pot';
import { PotPlan } from '../types/pot-plan';
import { RecurringPayment } from '../types/recurring-payment';
import { BalanceService } from './balance.service';
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
    private pots: PotsService,
    private balance: BalanceService
  ) {}

  private budgets = new BehaviorSubject<Budget[]>([]);

  async createInitialBudget(input: InitialBudgetInput) {
    const paymentsPromise = lastValueFrom(
      this.recurringPayments.getPayments().pipe(take(1))
    );
    const potsPromise = lastValueFrom(this.pots.getPots().pipe(take(1)));
    const balancePromise = lastValueFrom(
      this.balance.getAvailableBalance().pipe(take(1))
    );

    const [payments, pots, balance] = await Promise.all([
      paymentsPromise,
      potsPromise,
      balancePromise,
    ]);

    this.generateBudget(input, payments, balance, pots);
  }

  private distributePayments(
    input: InitialBudgetInput,
    payments: RecurringPayment[],
    pots: Pot[]
  ): Omit<PotPlan, 'adjustmentAmount'>[] {
    return pots.map((pot) => ({
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
  }

  private hydratePotplanAdjustments(
    potPlans: Omit<PotPlan, 'adjustmentAmount'>[]
  ): PotPlan[] {
    return potPlans.map((plan) => ({
      adjustmentAmount:
        plan.payments.reduce(
          (runningTotal, payment) => runningTotal + payment.amount,
          0
        ) - plan.balance,
      ...plan,
    }));
  }

  private generateBudget(
    input: InitialBudgetInput,
    recurringPayments: RecurringPayment[],
    balance: number,
    pots: Pot[]
  ) {
    const payments = this.distributePayments(input, recurringPayments, pots);
    const potPlans = this.hydratePotplanAdjustments(payments);

    const surplus = potPlans.reduce(
      (runningBalance, plan) => runningBalance - plan.adjustmentAmount,
      balance
    );

    const budget = {
      startDate: input.startDate,
      endDate: input.endDate,
      potPlans,
      surplus,
    };

    const budgets = this.budgets.value;
    this.budgets.next([...budgets, budget]);
  }

  getBudget(): Observable<Budget[]> {
    return this.budgets.asObservable();
  }
}
