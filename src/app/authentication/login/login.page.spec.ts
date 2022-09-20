import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPage } from './login.page';
import { Router } from '@angular/router';

const mockCredentials = { email: 'jorge@jorgevergara.co', password: '123456' };
const setup = async () => {
  const mockAuthenticationService = jasmine.createSpyObj(
    'AuthenticationService',
    ['login']
  );

  const mockAlertService = jasmine.createSpyObj('AlertService', [
    'presentInformationAlert',
  ]);

  await TestBed.configureTestingModule({
    declarations: [LoginPage],
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

  const fixture = TestBed.createComponent(LoginPage);
  const component = fixture.componentInstance;
  const router = TestBed.inject(Router);

  return {
    fixture,
    component,
    mockAuthenticationService,
    mockAlertService,
    router,
  };
};

describe('LoginPage', () => {
  it('creates the component', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('calls authentication service login method', async () => {
    const { component, mockAuthenticationService, router, fixture } =
      await setup();
    spyOn(router, 'navigateByUrl');
    component.login(mockCredentials);

    expect(mockAuthenticationService.login).toHaveBeenCalledTimes(1);
    expect(mockAuthenticationService.login).toHaveBeenCalledWith(
      mockCredentials
    );

    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('');
  });

  it('calls alert service when there is an error', async () => {
    const { component, mockAuthenticationService, fixture, mockAlertService } =
      await setup();

    mockAuthenticationService.login.and.throwError('error');

    component.login(mockCredentials);

    fixture.detectChanges();
    await fixture.whenStable();
    expect(mockAlertService.presentInformationAlert).toHaveBeenCalled();
  });
});
