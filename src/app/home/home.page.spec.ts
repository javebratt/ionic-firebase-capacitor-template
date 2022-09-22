import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const setup = async () => {
  TestBed.configureTestingModule({
    declarations: [HomePage],
    imports: [IonicModule.forRoot()],
  }).compileComponents();

  const fixture = TestBed.createComponent(HomePage);
  const component = fixture.componentInstance;

  return { fixture, component };
};

describe('HomePage', () => {
  it('creates the component', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
