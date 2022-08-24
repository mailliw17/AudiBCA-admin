import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabangPenjualEditComponent } from './cabang-penjual-edit.component';

describe('CabangPenjualEditComponent', () => {
  let component: CabangPenjualEditComponent;
  let fixture: ComponentFixture<CabangPenjualEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabangPenjualEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabangPenjualEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
