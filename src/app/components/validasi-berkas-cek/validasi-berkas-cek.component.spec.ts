import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiBerkasCekComponent } from './validasi-berkas-cek.component';

describe('ValidasiBerkasCekComponent', () => {
  let component: ValidasiBerkasCekComponent;
  let fixture: ComponentFixture<ValidasiBerkasCekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidasiBerkasCekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidasiBerkasCekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
