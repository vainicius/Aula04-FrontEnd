import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosDetailComponent } from './carros-detail.component';

describe('CarrosDetailComponent', () => {
  let component: CarrosDetailComponent;
  let fixture: ComponentFixture<CarrosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrosDetailComponent]
    });
    fixture = TestBed.createComponent(CarrosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
