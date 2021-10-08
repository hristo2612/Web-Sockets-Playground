import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/providers/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.notificationService.socket$.subscribe((data) => {
      console.log(data);
    });
  }

}
