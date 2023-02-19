import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketApiService } from '../shared/services/websocket.api.service';
import { webSocket } from 'rxjs/webSocket';
import { WEB_SOCKET } from '../app.module';
import { Subject, takeUntil } from 'rxjs';

export interface WsMsg {
  message: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    WebsocketApiService,
    {
      provide: WEB_SOCKET,
      useFactory: () =>
        webSocket({
          url: 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
          deserializer: (e) => {
            try {
              return JSON.parse(e.data);
            } catch (e) {
              console.warn(e);
            }
          },
        }),
    },
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  destroy$ = new Subject();

  constructor(
    public wsService: WebsocketApiService<WsMsg>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.wsService.stream$.pipe(takeUntil(this.destroy$)).subscribe((msg) => {
      this.messages.push(msg.message);
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.wsService.disconnect();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  sendMessage(msg: string): void {
    this.wsService.message({ message: msg });
  }
}
