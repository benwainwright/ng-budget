import { Injectable } from '@angular/core';

interface InitialBudgetInput {
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor() {}

  createInitialBudget(input: InitialBudgetInput) {}
}
