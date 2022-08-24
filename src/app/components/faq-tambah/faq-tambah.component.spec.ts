import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTambahComponent } from './faq-tambah.component';

describe('FaqTambahComponent', () => {
  let component: FaqTambahComponent;
  let fixture: ComponentFixture<FaqTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
