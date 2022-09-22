import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

const setup = async () => {
  TestBed.configureTestingModule({
    declarations: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }).compileComponents();

  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;

  return { fixture, app };
};

describe('AppComponent', () => {
  it('should create the app', async () => {
    const { app } = await setup();
    expect(app).toBeTruthy();
  });
});
