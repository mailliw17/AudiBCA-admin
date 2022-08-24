import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotLelangTambahComponent } from './lot-lelang-tambah.component';

describe('LotLelangTambahComponent', () => {
  let component: LotLelangTambahComponent;
  let fixture: ComponentFixture<LotLelangTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotLelangTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotLelangTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
