import { webSocket } from 'rxjs/webSocket';
import { inject } from '@angular/core';
import { WS_URL } from '../../app.module';

export const WebSocketFactory = (url?: string, deserializer?: () => {}) => {
  return webSocket({
    url: url ? url : inject(WS_URL),
    deserializer: deserializer
      ? deserializer
      : (e) => {
          try {
            return JSON.parse(e.data);
          } catch (err) {
            console.warn(err);
          }
        },
  });
};
