import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authedit } from './authedit';

describe('Authedit', () => {
  let component: Authedit;
  let fixture: ComponentFixture<Authedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authedit],
    }).compileComponents();

    fixture = TestBed.createComponent(Authedit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
