import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicepageComponent } from './invoicepage.component';

describe('InvoicepageComponent', () => {
  let component: InvoicepageComponent;
  let fixture: ComponentFixture<InvoicepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
