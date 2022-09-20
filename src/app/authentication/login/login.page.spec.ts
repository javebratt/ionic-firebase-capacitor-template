import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

import { LoginPage } from './login.page';

const setup = async () => {
  const mockAuthenticationService = jasmine.createSpyObj(
    'AuthenticationService',
    ['login']
  );
  await TestBed.configureTestingModule({
    declarations: [LoginPage],
    imports: [IonicModule.forRoot(), ReactiveFormsModule],
    providers: [
      {
        provide: AuthenticationService,
        useValue: mockAuthenticationService,
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(LoginPage);
  const component = fixture.componentInstance;
  return { fixture, component };
};

describe('LoginPage', () => {
  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
