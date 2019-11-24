import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSubMainComponent } from './other-sub-main.component';

describe('OtherSubMainComponent', () => {
  let component: OtherSubMainComponent;
  let fixture: ComponentFixture<OtherSubMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSubMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSubMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
