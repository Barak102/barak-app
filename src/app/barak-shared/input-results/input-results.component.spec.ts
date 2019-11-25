import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputResultsComponent } from './input-results.component';

describe('InputResultsComponent', () => {
  let component: InputResultsComponent;
  let fixture: ComponentFixture<InputResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
