import { SettingsService } from './settings.service';
import { lastValueFrom } from 'rxjs';

describe('settings service', () => {
  it('should be instantiated without error', () => {
    new SettingsService();
  });

  describe('getNextpayday', () => {
    it('resolves to a default value of today', async () => {
      const service = new SettingsService();

      const result = await lastValueFrom(service.getNextPayday());

      const today = new Date(Date.now());

      expect(result.getDay()).toEqual(today.getDay());
      expect(result.getMonth()).toEqual(today.getMonth());
      expect(result.getFullYear()).toEqual(today.getFullYear());
    });

    it('should return the new date when set', async () => {
      const service = new SettingsService();

      const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 4);

      service.setNextPayday(tomorrow);

      const result = await lastValueFrom(service.getNextPayday());

      const today = new Date(Date.now());

      expect(result.getDay()).toEqual(tomorrow.getDay());
      expect(result.getMonth()).toEqual(tomorrow.getMonth());
      expect(result.getFullYear()).toEqual(tomorrow.getFullYear());
    });
  });

  describe('getOverdraft', () => {
    it('resolves to a default value of 0', async () => {
      const service = new SettingsService();

      const result = await lastValueFrom(service.getOverdraft());

      expect(result).toEqual(0);
    });

    it('should reflect the new overdraft when changed', async () => {
      const service = new SettingsService();

      service.setOverdraft(100);
      const result = await lastValueFrom(service.getOverdraft());

      expect(result).toEqual(100);
    });
  });
});
