import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

import { SignupPage } from './signup.page';

const setup = async () => {
  const mockAuthenticationService = jasmine.createSpyObj(
    'AuthenticationService',
    ['signup']
  );
  await TestBed.configureTestingModule({
    declarations: [SignupPage],
    imports: [IonicModule.forRoot(), ReactiveFormsModule],
    providers: [
      {
        provide: AuthenticationService,
        useValue: mockAuthenticationService,
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(SignupPage);
  const component = fixture.componentInstance;
  return { fixture, component };
};

describe('SignupPage', () => {
  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
