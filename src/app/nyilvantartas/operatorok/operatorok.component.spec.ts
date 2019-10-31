import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorokComponent } from './operatorok.component';

describe('OperatorokComponent', () => {
  let component: OperatorokComponent;
  let fixture: ComponentFixture<OperatorokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
