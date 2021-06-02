import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteaccountpageComponent } from './deleteaccountpage.component';

describe('DeleteaccountpageComponent', () => {
  let component: DeleteaccountpageComponent;
  let fixture: ComponentFixture<DeleteaccountpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteaccountpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteaccountpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
