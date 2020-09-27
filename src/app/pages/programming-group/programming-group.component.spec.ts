import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingGroupComponent } from './programming-group.component';

describe('ProgrammingGroupComponent', () => {
  let component: ProgrammingGroupComponent;
  let fixture: ComponentFixture<ProgrammingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
