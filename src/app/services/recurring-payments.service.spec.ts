import { lastValueFrom } from 'rxjs';
import { RecurringPayment } from '../types/recurring-payment';
import { RecurringPaymentsService } from './recurring-payments.service';

describe('recurring payments service', () => {
  it('should be instantiated without error', () => {
    new RecurringPaymentsService();
  });

  describe('getpayments', () => {
    it('should return an empty array as a default value', async () => {
      const service = new RecurringPaymentsService();

      const result = await lastValueFrom(service.getPayments());

      expect(result).toEqual([]);
    });

    it('should return the recurring payments that have been set', async () => {
      const service = new RecurringPaymentsService();

      const payments: RecurringPayment[] = [
        {
          id: '0',
          name: 'Cleaner',
          when: 'tomorrow',
          amount: 100,
          pot: 'foo',
        },

        {
          id: '1',
          name: 'Electricity',
          when: 'every week',
          amount: 300,
          pot: 'bar',
        },
      ];

      service.setPayments(payments);
      const result = await lastValueFrom(service.getPayments());

      expect(result).toEqual(payments);
    });
  });
});
