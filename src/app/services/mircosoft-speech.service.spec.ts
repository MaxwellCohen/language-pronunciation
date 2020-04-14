import { TestBed } from '@angular/core/testing';

import { MircosoftSpeechService } from './mircosoft-speech.service';

describe('MircosoftSpeechService', () => {
  let service: MircosoftSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MircosoftSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
