import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkTambahComponent } from './sdk-tambah.component';

describe('SdkTambahComponent', () => {
  let component: SdkTambahComponent;
  let fixture: ComponentFixture<SdkTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdkTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdkTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
