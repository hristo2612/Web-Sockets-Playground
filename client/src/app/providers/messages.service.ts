import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  socket$: WebSocketSubject<any> = webSocket({
    url: environment.production ? `wss://${environment.host}/api` : `ws://${environment.host}/api`
  });
}
