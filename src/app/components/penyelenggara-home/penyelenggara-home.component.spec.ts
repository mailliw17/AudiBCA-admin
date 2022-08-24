import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenyelenggaraHomeComponent } from './penyelenggara-home.component';

describe('PenyelenggaraHomeComponent', () => {
  let component: PenyelenggaraHomeComponent;
  let fixture: ComponentFixture<PenyelenggaraHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenyelenggaraHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenyelenggaraHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
