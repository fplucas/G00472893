import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonCard, IonCardHeader, IonCardTitle, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {

  searchString: string;
  apiKey: string = "";
  options: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/complexSearch",
    params: {
      apiKey: this.apiKey
    }
  }
  recipes: any = [];

  constructor(private mhs: MyHttpService) {
    this.searchString = "";
  }


  async search() {
    // Check if params exist, if not create it as an empty dictionary
    this.options.params = this.options.params ?? {};
    this.options.params['query'] = this.searchString;
    let result = await this.mhs.get(this.options);
    this.recipes = result.data.results;
  }

}
