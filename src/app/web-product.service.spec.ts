import { TestBed } from '@angular/core/testing';

import { WebProductService } from './web-product.service';

describe('WebProductService', () => {
  let service: WebProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
