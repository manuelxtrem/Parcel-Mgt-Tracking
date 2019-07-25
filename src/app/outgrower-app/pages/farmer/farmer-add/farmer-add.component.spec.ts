import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerAddComponent } from './farmer-add.component';

describe('FarmerAddComponent', () => {
  let component: FarmerAddComponent;
  let fixture: ComponentFixture<FarmerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
