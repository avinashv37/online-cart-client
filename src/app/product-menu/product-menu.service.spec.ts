import { TestBed } from '@angular/core/testing';

import { ProductMenuService } from './product-menu.service';

describe('ProductMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductMenuService = TestBed.get(ProductMenuService);
    expect(service).toBeTruthy();
  });
});
