import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  recipeId: number = 10;
  options: HttpOptions = {
    url: `https://api.spoonacular.com/recipes/${this.recipeId}/information`,
    params: {
      apiKey: environment.apiKey,
    }
  }
  instructions: any = [];

  constructor(private mhs: MyHttpService) {
  }


  async getRecipeDetails() {
    // Check if params exist, if not create it as an empty dictionary
    let result = await this.mhs.get(this.options);
    this.instructions = result.data;
    console.log(this.instructions);
  }

  ngOnInit() {
  }

}
