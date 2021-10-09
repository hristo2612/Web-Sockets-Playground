import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/providers/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private msgService: MessageService) { }

  ngOnInit(): void {
    this.msgService.getAllNotifications();
    this.msgService.socket$.subscribe((data) => {
      console.log(data);
    });
  }

}
