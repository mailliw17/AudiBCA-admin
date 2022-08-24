import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkEditComponent } from './sdk-edit.component';

describe('SdkEditComponent', () => {
  let component: SdkEditComponent;
  let fixture: ComponentFixture<SdkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
