import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualHomeComponent } from './penjual-home.component';

describe('PenjualHomeComponent', () => {
  let component: PenjualHomeComponent;
  let fixture: ComponentFixture<PenjualHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenjualHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenjualHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
