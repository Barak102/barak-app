import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMainComponent } from './sub-main.component';

describe('SubMainComponent', () => {
  let component: SubMainComponent;
  let fixture: ComponentFixture<SubMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
