import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  socket$: WebSocketSubject<any> = webSocket({
    url: 'ws://localhost:3000/api',
    deserializer: (e: MessageEvent) => JSON.parse(e.data),
    openObserver: {
      next: (e: Event) => console.log('open', e),
      error: (e: Event) => console.log('error', e),
      complete: () => console.log('complete')
    }
  })

  constructor() { }
}
