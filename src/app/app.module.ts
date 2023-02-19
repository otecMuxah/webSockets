import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketFactory } from './shared/utils/webSocketFactory';

export const WS_URL: InjectionToken<string> = new InjectionToken('WS_URL');
export const WEB_SOCKET = new InjectionToken<WebSocketSubject<any>>(
  'WEB_SOCKET'
);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: WS_URL,
      useValue:
        'wss://connect.websocket.in/v3/1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
    },
    {
      provide: WEB_SOCKET,
      useFactory: WebSocketFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
