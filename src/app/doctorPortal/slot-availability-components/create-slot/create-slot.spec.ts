import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlot } from './create-slot';

describe('CreateSlot', () => {
  let component: CreateSlot;
  let fixture: ComponentFixture<CreateSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
