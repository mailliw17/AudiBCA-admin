import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkHomeComponent } from './sdk-home.component';

describe('SdkHomeComponent', () => {
  let component: SdkHomeComponent;
  let fixture: ComponentFixture<SdkHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdkHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
