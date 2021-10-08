import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  socket$: WebSocketSubject<any> = webSocket({
    url: `wss://${environment.host}/api`
  })

  constructor() { }

  getAllNotifications() {
    return this.socket$.next({
      type: 'get-all-notifications',
      body: 'Hello World!'
    });
  }

  getLatestNotification() {

  }


}
