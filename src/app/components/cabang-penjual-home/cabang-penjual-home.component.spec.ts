import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabangPenjualHomeComponent } from './cabang-penjual-home.component';

describe('CabangPenjualHomeComponent', () => {
  let component: CabangPenjualHomeComponent;
  let fixture: ComponentFixture<CabangPenjualHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabangPenjualHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabangPenjualHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
