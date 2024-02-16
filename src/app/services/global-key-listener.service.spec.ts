import { TestBed } from '@angular/core/testing';

import { GlobalKeyListenerService } from './global-key-listener.service';

describe('GlobalKeyListenerService', () => {
  let service: GlobalKeyListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalKeyListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
