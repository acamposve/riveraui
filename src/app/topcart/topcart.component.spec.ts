import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcartComponent } from './topcart.component';

describe('TopcartComponent', () => {
  let component: TopcartComponent;
  let fixture: ComponentFixture<TopcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
