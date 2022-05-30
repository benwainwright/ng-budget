import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecurringPayment } from '../types/recurring-payment';

@Injectable({
  providedIn: 'root',
})
export class RecurringPaymentsService {
  private payments: RecurringPayment[] = [];
  constructor() {}

  getPayments(): Observable<RecurringPayment[]> {
    return of(this.payments);
  }

  setPayments(payments: RecurringPayment[]) {
    this.payments = payments;
    return of(void 0);
  }
}
