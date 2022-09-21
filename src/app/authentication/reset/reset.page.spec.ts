import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../authentication.service';

import { ResetPage } from './reset.page';

const setup = async () => {
  const mockAuthenticationService = createSpyFromClass(AuthenticationService, {
    methodsToSpyOn: ['resetPassword'],
  });

  const mockAlertService = createSpyFromClass(AlertService, {
    methodsToSpyOn: ['presentInformationAlert'],
  });

  await TestBed.configureTestingModule({
    declarations: [ResetPage],
    imports: [IonicModule.forRoot(), ReactiveFormsModule],
    providers: [
      {
        provide: AuthenticationService,
        useValue: mockAuthenticationService,
      },
      {
        provide: AlertService,
        useValue: mockAlertService,
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(ResetPage);
  const component = fixture.componentInstance;
  return { fixture, component, mockAlertService, mockAuthenticationService };
};

describe('ResetPage', () => {
  it('creates the page', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  describe('reset', () => {
    it('calls authentication service login method and information alert', async () => {
      const {
        component,
        mockAuthenticationService,
        fixture,
        mockAlertService,
      } = await setup();

      component.reset('jorge@jorgevergara.co');

      expect(mockAuthenticationService.resetPassword).toHaveBeenCalledTimes(1);
      expect(mockAuthenticationService.resetPassword).toHaveBeenCalledWith(
        'jorge@jorgevergara.co'
      );

      fixture.detectChanges();
      await fixture.whenStable();
      expect(mockAlertService.presentInformationAlert).toHaveBeenCalledOnceWith(
        `If there is an account with that email we'll send a confirmation link in a few moments`
      );
    });

    it('calls information error alert', async () => {
      const {
        component,
        mockAuthenticationService,
        fixture,
        mockAlertService,
      } = await setup();

      mockAuthenticationService.resetPassword.and.throwError('error');
      component.reset('jorge@jorgevergara.co');

      fixture.detectChanges();
      await fixture.whenStable();
      expect(mockAlertService.presentInformationAlert).toHaveBeenCalledTimes(1);
    });
  });
});
