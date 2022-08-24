import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotLelangHomeComponent } from './lot-lelang-home.component';

describe('LotLelangHomeComponent', () => {
  let component: LotLelangHomeComponent;
  let fixture: ComponentFixture<LotLelangHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotLelangHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotLelangHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
