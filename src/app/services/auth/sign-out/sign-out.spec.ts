import { TestBed } from '@angular/core/testing';

import { SignOut } from './sign-out';

describe('SignOut', () => {
  let service: SignOut;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignOut);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
