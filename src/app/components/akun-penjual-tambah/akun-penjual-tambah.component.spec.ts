import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunPenjualTambahComponent } from './akun-penjual-tambah.component';

describe('AkunPenjualTambahComponent', () => {
  let component: AkunPenjualTambahComponent;
  let fixture: ComponentFixture<AkunPenjualTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkunPenjualTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkunPenjualTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
