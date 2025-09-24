import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationNotes } from './consultation-notes';

describe('ConsultationNotes', () => {
  let component: ConsultationNotes;
  let fixture: ComponentFixture<ConsultationNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
