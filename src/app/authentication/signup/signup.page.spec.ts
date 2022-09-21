import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../authentication.service';

import { SignupPage } from './signup.page';

const mockCredentials = {
  email: 'jorge@jorgevergara.co',
  password: '123456',
  name: 'Jorge Vergara',
};

const setup = async () => {
  const mockAuthenticationService = createSpyFromClass(AuthenticationService, {
    methodsToSpyOn: ['signup'],
  });

  const mockAlertService = createSpyFromClass(AlertService, {
    methodsToSpyOn: ['presentInformationAlert'],
  });

  await TestBed.configureTestingModule({
    declarations: [SignupPage],
    imports: [IonicModule.forRoot(), ReactiveFormsModule, RouterTestingModule],
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

  const fixture = TestBed.createComponent(SignupPage);
  const component = fixture.componentInstance;
  const router = TestBed.inject(Router);

  return {
    fixture,
    component,
    mockAlertService,
    mockAuthenticationService,
    router,
  };
};

describe('SignupPage', () => {
  it('creates the page', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  describe('signup', () => {
    it('calls authentication service login method', async () => {
      const { component, mockAuthenticationService, router, fixture } =
        await setup();

      spyOn(router, 'navigateByUrl');
      component.signup(mockCredentials);

      expect(mockAuthenticationService.signup).toHaveBeenCalledOnceWith(
        mockCredentials
      );

      fixture.detectChanges();
      await fixture.whenStable();
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('');
    });

    it('calls alert service when there is an error', async () => {
      const {
        component,
        mockAuthenticationService,
        fixture,
        mockAlertService,
      } = await setup();

      mockAuthenticationService.signup.and.throwError('error');

      component.signup(mockCredentials);

      fixture.detectChanges();
      await fixture.whenStable();
      expect(mockAlertService.presentInformationAlert).toHaveBeenCalled();
    });
  });
});
