import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenyelenggaraEditComponent } from './penyelenggara-edit.component';

describe('PenyelenggaraEditComponent', () => {
  let component: PenyelenggaraEditComponent;
  let fixture: ComponentFixture<PenyelenggaraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenyelenggaraEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenyelenggaraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
