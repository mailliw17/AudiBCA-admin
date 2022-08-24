import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenyelenggaraTambahComponent } from './penyelenggara-tambah.component';

describe('PenyelenggaraTambahComponent', () => {
  let component: PenyelenggaraTambahComponent;
  let fixture: ComponentFixture<PenyelenggaraTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenyelenggaraTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenyelenggaraTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
