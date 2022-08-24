import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorTambahComponent } from './operator-tambah.component';

describe('OperatorTambahComponent', () => {
  let component: OperatorTambahComponent;
  let fixture: ComponentFixture<OperatorTambahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorTambahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
