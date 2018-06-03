import { TestBed, inject } from '@angular/core/testing';

import { ShoppoingCartService } from './shoppoing-cart.service';

describe('ShoppoingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppoingCartService]
    });
  });

  it('should be created', inject([ShoppoingCartService], (service: ShoppoingCartService) => {
    expect(service).toBeTruthy();
  }));
});
