import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productadd } from './productadd';

describe('Productadd', () => {
  let component: Productadd;
  let fixture: ComponentFixture<Productadd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productadd],
    }).compileComponents();

    fixture = TestBed.createComponent(Productadd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
