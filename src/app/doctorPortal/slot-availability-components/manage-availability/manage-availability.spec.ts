import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAvailability } from './manage-availability';

describe('ManageAvailability', () => {
  let component: ManageAvailability;
  let fixture: ComponentFixture<ManageAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAvailability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
