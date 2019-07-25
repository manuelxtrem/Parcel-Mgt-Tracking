import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportNoticeComponent } from './transport-notice.component';

describe('TransportNoticeComponent', () => {
  let component: TransportNoticeComponent;
  let fixture: ComponentFixture<TransportNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
