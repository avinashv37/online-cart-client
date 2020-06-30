import { Product } from './product.model';

describe('Product.Model', () => {
  it('should create an instance', () => {
    expect(new Product()).toBeTruthy();
  });
});
