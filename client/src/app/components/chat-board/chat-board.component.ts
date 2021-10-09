import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/providers/messages.service';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent implements OnInit {

  userName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals]
  });

  messages: any = [];

  constructor(private msgService: MessageService) { }

  ngOnInit(): void {
    this.msgService.socket$.subscribe(
      (message: any) => {
        let msg: any = {
          type: 'text',
          text: message.text,
          name: message.userName,
          reply: false,
          avatar: 'https://i.gifer.com/6oa.gif'
        }
        msg = message.userName === this.userName ? { ...msg, reply: true } : msg
        this.messages.push(msg);
      }
    )
  }

  sendMessage(event: any) {
    this.msgService.socket$.next({
      type: 'chat-message',
      data: {
        userName: this.userName,
        text: event.message
      }
    });
  }

}
