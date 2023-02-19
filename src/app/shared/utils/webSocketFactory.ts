import { webSocket } from 'rxjs/webSocket';
import { inject } from '@angular/core';
import { WS_URL } from '../../app.module';

export const WebSocketFactory = () => {
  return webSocket({
    url: inject(WS_URL),
    deserializer: (e) => {
      try {
        return JSON.parse(e.data);
      } catch (err) {
        console.log(err);
      }
    },
  });
};
