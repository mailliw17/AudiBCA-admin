import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualTambahComponent } from './penjual-tambah.component';

describe('PenjualTambahComponent', () => {
  let component: PenjualTambahComponent;
  let fixture: ComponentFixture<PenjualTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenjualTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenjualTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
