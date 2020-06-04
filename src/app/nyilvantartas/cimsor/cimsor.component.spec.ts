import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsorComponent } from './cimsor.component';

describe('CimsorComponent', () => {
  let component: CimsorComponent;
  let fixture: ComponentFixture<CimsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimsorComponent ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
