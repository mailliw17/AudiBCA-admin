import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotLelangEditComponent } from './lot-lelang-edit.component';

describe('LotLelangEditComponent', () => {
  let component: LotLelangEditComponent;
  let fixture: ComponentFixture<LotLelangEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotLelangEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotLelangEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
