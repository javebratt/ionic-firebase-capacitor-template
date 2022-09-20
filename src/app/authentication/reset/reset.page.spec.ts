import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

import { ResetPage } from './reset.page';

const setup = async () => {
  const mockAuthenticationService = jasmine.createSpyObj(
    'AuthenticationService',
    ['resetPassword']
  );
  await TestBed.configureTestingModule({
    declarations: [ResetPage],
    imports: [IonicModule.forRoot(), ReactiveFormsModule],
    providers: [
      {
        provide: AuthenticationService,
        useValue: mockAuthenticationService,
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(ResetPage);
  const component = fixture.componentInstance;
  return { fixture, component };
};

describe('ResetPage', () => {
  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
