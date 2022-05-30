import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  private overdraft: number = 0;
  private nextPayday: Date = new Date(Date.now());

  getNextPayday(): Observable<Date> {
    return of(this.nextPayday);
  }

  setNextPayday(day: Date): Observable<void> {
    this.nextPayday = day;
    return of(void 0);
  }

  getOverdraft(): Observable<number> {
    return of(this.overdraft);
  }

  setOverdraft(amount: number): Observable<void> {
    this.overdraft = amount;
    return of(void 0);
  }
}
