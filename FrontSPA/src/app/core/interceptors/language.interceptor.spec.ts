import { TestBed } from '@angular/core/testing';

import { LanguageInterceptor } from './language.interceptor';

describe('LanguageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LanguageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LanguageInterceptor = TestBed.inject(LanguageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
