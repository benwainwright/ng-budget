import { date } from './date';
import { getDates } from './get-dates';

describe('get dates', () => {
  it('correctly identifies the last thursday of every month', () => {
    const dates = getDates(
      'last thursday of every month',
      date(1, 7, 2022),
      date(1, 6, 2022)
    );

    expect(dates).toHaveLength(1);
    expect(dates[0]).toBeSameDayAs(date(30, 6, 2022));
  });
});
