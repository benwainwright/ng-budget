import { date } from './date';
import { getDates } from './get-dates';

describe('get dates', () => {
  it('correctly identifies every week on wednesday', () => {
    const dates = getDates(
      'every week on wednesday',
      date(30, 6, 2022),
      date(31, 5, 2022)
    );

    expect(dates).toHaveLength(5);
    expect(dates[0]).toBeSameDayAs(date(1, 6, 2022));
    expect(dates[1]).toBeSameDayAs(date(8, 6, 2022));
    expect(dates[2]).toBeSameDayAs(date(15, 6, 2022));
    expect(dates[3]).toBeSameDayAs(date(22, 6, 2022));
    expect(dates[4]).toBeSameDayAs(date(29, 6, 2022));
  });

  it('correctly identifies every thursday', () => {
    const dates = getDates(
      'every thursday',
      date(1, 7, 2022),
      date(1, 6, 2022)
    );

    expect(dates).toHaveLength(5);
    expect(dates[0]).toBeSameDayAs(date(2, 6, 2022));
    expect(dates[1]).toBeSameDayAs(date(9, 6, 2022));
    expect(dates[2]).toBeSameDayAs(date(16, 6, 2022));
    expect(dates[3]).toBeSameDayAs(date(23, 6, 2022));
    expect(dates[4]).toBeSameDayAs(date(30, 6, 2022));
  });
});
