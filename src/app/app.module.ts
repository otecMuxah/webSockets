import { inject, Inject, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

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
      useFactory: () =>
        webSocket({
          url: inject(WS_URL),
          deserializer: (e) => {
            try {
              return JSON.parse(e.data);
            } catch (e) {
              console.log(e);
            }
          },
        }),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
