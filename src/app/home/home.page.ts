import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonInput, IonButton, IonHeader, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MyDataService } from '../services/my-data.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [HeaderComponent, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonInput, IonButton, IonHeader, IonContent, CommonModule],
})
export class HomePage {

  searchString: string;
  options: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/complexSearch",
    params: {
      apiKey: environment.apiKey,
    }
  }
  recipes: any = [];

  constructor(private mds: MyDataService, private mhs: MyHttpService, private router: Router) {
    this.searchString = "";
  }


  async search() {
    // Check if params exist, if not create it as an empty dictionary
    this.options.params = this.options.params ?? {};
    this.options.params['query'] = this.searchString;
    let result = await this.mhs.get(this.options);
    this.recipes = result.data.results;
  }

  async openRecipe(recipe: any) {
    await this.mds.set("selectedRecipe", recipe.id);
    this.router.navigate(['/recipe-details']);
  }

}
