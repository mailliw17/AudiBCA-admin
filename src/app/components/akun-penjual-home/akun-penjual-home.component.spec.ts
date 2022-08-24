import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunPenjualHomeComponent } from './akun-penjual-home.component';

describe('AkunPenjualHomeComponent', () => {
  let component: AkunPenjualHomeComponent;
  let fixture: ComponentFixture<AkunPenjualHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkunPenjualHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkunPenjualHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
