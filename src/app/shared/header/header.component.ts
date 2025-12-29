import { IonBackButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/angular/standalone'
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [IonBackButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, RouterModule],
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() { }

}
