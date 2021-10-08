import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  socket$: WebSocketSubject<any> = webSocket({
    url: `ws://${environment.host}/api`
  })

  constructor() { }

  getAllNotifications() {
    return this.socket$.next({
      type: 'get-all-notifications',
      body: 'Hey brother'
    });
  }

  getLatestNotification() {

  }


}
