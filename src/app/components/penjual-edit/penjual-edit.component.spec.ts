import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualEditComponent } from './penjual-edit.component';

describe('PenjualEditComponent', () => {
  let component: PenjualEditComponent;
  let fixture: ComponentFixture<PenjualEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenjualEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenjualEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
