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
import { HomeFacadeService } from './data-access/home.facade.service';

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
    // we can override websocket URL or deserializer function on component or module level
    // {
    //   provide: WEB_SOCKET,
    //   useFactory: () =>
    //     webSocket({
    //       url: 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
    //       deserializer: (e) => {
    //         try {
    //           return JSON.parse(e.data);
    //         } catch (e) {
    //           console.warn(e);
    //         }
    //       },
    //     }),
    // },
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  destroy$ = new Subject();

  constructor(
    public homeFacadeService: HomeFacadeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.homeFacadeService
      .getStream()
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => {
        this.messages.push(msg.message);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.homeFacadeService.disconnect();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  sendMessage(msg: string): void {
    this.homeFacadeService.sendMessage(msg);
  }
}
