import { TestBed } from '@angular/core/testing';

import { CropServiceService } from './crop-service.service';

describe('CropServiceService', () => {
  let service: CropServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
