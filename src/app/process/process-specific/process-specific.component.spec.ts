import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSpecificComponent } from './process-specific.component';

describe('ProcessSpecificComponent', () => {
  let component: ProcessSpecificComponent;
  let fixture: ComponentFixture<ProcessSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
