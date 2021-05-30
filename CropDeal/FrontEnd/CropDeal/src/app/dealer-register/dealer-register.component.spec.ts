import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerRegisterComponent } from './dealer-register.component';

describe('DealerRegisterComponent', () => {
  let component: DealerRegisterComponent;
  let fixture: ComponentFixture<DealerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
