import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {

  favourites: { [key: string]: { title: string; image: string } } = {};
  objectKeys = Object.keys;

  constructor(private mds: MyDataService, private router: Router) { }

  ngOnInit() {
    this.getFavourites();
  }

  async getFavourites() {
    this.favourites = await this.mds.get("favourites") || {};
    console.log(this.favourites);
  }

  async openRecipe(recipeId: any) {
    await this.mds.set("selectedRecipe", recipeId);
    this.router.navigate(['/recipe-details']);
  }

}
