import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallgatokComponent } from './hallgatok.component';

describe('HallgatokComponent', () => {
  let component: HallgatokComponent;
  let fixture: ComponentFixture<HallgatokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallgatokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallgatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
