import { TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { createSpyFromClass } from 'jasmine-auto-spies';

import { AlertService } from './alert.service';

const setup = () => {
  const mockAlertController = createSpyFromClass(AlertController, {
    methodsToSpyOn: ['create'],
  });

  mockAlertController.create.and.resolveTo({
    present: () => Promise.resolve(),
  });

  TestBed.configureTestingModule({
    providers: [{ provide: AlertController, useValue: mockAlertController }],
  });
  const service = TestBed.inject(AlertService);

  return { service, mockAlertController };
};

describe('AlertService', () => {
  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  describe('presentInformationAlert', () => {
    it('calls alertController.create', async () => {
      const { service, mockAlertController } = setup();
      await service.presentInformationAlert('message');
      expect(mockAlertController.create).toHaveBeenCalledOnceWith({
        message: 'message',
        buttons: ['OK'],
      });
    });
  });
});
