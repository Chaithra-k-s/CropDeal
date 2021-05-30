import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropstoreComponent } from './cropstore.component';

describe('CropstoreComponent', () => {
  let component: CropstoreComponent;
  let fixture: ComponentFixture<CropstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropstoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
