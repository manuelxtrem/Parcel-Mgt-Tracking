import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParcelComponent } from './report-parcel.component';

describe('ReportParcelComponent', () => {
  let component: ReportParcelComponent;
  let fixture: ComponentFixture<ReportParcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportParcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
