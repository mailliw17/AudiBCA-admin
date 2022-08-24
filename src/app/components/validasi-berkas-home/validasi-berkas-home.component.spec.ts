import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiBerkasHomeComponent } from './validasi-berkas-home.component';

describe('ValidasiBerkasHomeComponent', () => {
  let component: ValidasiBerkasHomeComponent;
  let fixture: ComponentFixture<ValidasiBerkasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidasiBerkasHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidasiBerkasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
