import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificApplicationComponent } from './specific-application.component';

describe('SpecificApplicationComponent', () => {
  let component: SpecificApplicationComponent;
  let fixture: ComponentFixture<SpecificApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
