import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  socket$: WebSocketSubject<any> = webSocket({
    url: environment.production ? `wss://${environment.host}/api` : `ws://${environment.host}/api`
  })

  constructor() { }

  constructMessageFromServer(serverMsg: any, userName: string) {
    let msg: any = {
      type: 'text',
      text: serverMsg.text,
      name: serverMsg.userName,
      reply: false,
      avatar: 'https://i.gifer.com/6oa.gif'
    }
    msg = serverMsg.userName === userName ? { ...msg, reply: true } : msg
    return msg;
  }

}
