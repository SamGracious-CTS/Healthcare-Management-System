import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousAppoitment } from './previous-appoitment';

describe('PreviousAppoitment', () => {
  let component: PreviousAppoitment;
  let fixture: ComponentFixture<PreviousAppoitment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousAppoitment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousAppoitment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
