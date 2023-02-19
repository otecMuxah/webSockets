import { Injectable } from '@angular/core';
import { WebsocketApiService } from '../../shared/services/websocket.api.service';
import { WsMsg } from '../home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeFacadeService {
  constructor(private wsService: WebsocketApiService<WsMsg>) {}

  getStream(): Observable<WsMsg> {
    return this.wsService.stream$;
  }

  sendMessage(msg: string): void {
    this.wsService.message({ message: msg } as WsMsg);
  }

  disconnect(): void {
    this.wsService.disconnect();
  }
}
