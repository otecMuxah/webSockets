import { Inject, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter, Observable } from 'rxjs';
import { WEB_SOCKET } from '../../app.module';

@Injectable()
export class WebsocketApiService<T> {
  public stream$!: Observable<T>;

  constructor(@Inject(WEB_SOCKET) private wsSubject: WebSocketSubject<T>) {
    this.stream$ = this.wsSubject.asObservable().pipe(filter(Boolean));
  }

  message(msg: T) {
    this.wsSubject.next(msg);
  }

  disconnect() {
    this.wsSubject.complete();
  }
}
