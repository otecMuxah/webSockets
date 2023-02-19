import { TestBed } from '@angular/core/testing';

import { WebsocketApiService } from './websocket.api.service';
import { WEB_SOCKET, WS_URL } from '../../app.module';
import { BehaviorSubject } from 'rxjs';

describe('WebsocketApiService', () => {
  let service: WebsocketApiService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebsocketApiService,
        { provide: WS_URL, useValue: 'wss://testURL' },
        {
          provide: WEB_SOCKET,
          useFactory: () => new BehaviorSubject({ message: 'test' }),
        },
      ],
    });
    service = TestBed.inject(WebsocketApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe on created stream', (done) => {
    service.stream$.subscribe((data) => {
      expect(data).toEqual({ message: 'test' });
      done();
    });
  });

  it('should get sent message', (done) => {
    service.message({ message: 'test2' });

    service.stream$.subscribe((data) => {
      expect(data).toEqual({ message: 'test2' });
      done();
    });
  });

  it('should close stream', (done) => {
    service.disconnect();

    service.stream$.subscribe(
      () => {},
      () => {},
      () => {
        // expecting complete to be called
        expect(true).toEqual(true);
        done();
      }
    );
  });
});
