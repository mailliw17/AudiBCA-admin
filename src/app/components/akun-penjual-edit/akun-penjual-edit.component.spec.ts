import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunPenjualEditComponent } from './akun-penjual-edit.component';

describe('AkunPenjualEditComponent', () => {
  let component: AkunPenjualEditComponent;
  let fixture: ComponentFixture<AkunPenjualEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkunPenjualEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkunPenjualEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
