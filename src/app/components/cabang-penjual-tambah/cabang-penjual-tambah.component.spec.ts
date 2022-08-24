import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabangPenjualTambahComponent } from './cabang-penjual-tambah.component';

describe('CabangPenjualTambahComponent', () => {
  let component: CabangPenjualTambahComponent;
  let fixture: ComponentFixture<CabangPenjualTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabangPenjualTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabangPenjualTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
