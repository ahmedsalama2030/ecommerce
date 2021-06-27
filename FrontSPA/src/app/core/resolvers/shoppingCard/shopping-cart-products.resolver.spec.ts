import { TestBed } from '@angular/core/testing';

import { ShoppingCartProductsResolver } from './shopping-cart-products.resolver';

describe('ShoppingCartProductsResolver', () => {
  let resolver: ShoppingCartProductsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShoppingCartProductsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
