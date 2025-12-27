import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  standalone: true,
  imports: [IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  recipeId: number = 0;
  options: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/",
    params: {
      apiKey: environment.apiKey,
    }
  }
  recipeDetails: any;
  imagesCdn: string = "https://spoonacular.com/cdn/ingredients_100x100/";
  favourites: number[] = [];
  isFavourite!: boolean;
  favouriteButtonText!: string;
  measures: string = "metric";

  constructor(private mhs: MyHttpService, private mds: MyDataService) {
  }

  ngOnInit() {
    this.isRecipeAFavourite();
    this.getRecipeDetails();
    this.isRecipeAFavourite();
  }

  async getRecipeDetails() {
    await this.getRecipeId();
    let result = await this.mhs.get(this.options);
    this.recipeDetails = result.data;
    console.log(result.data.extendedIngredients)
  }

  async getRecipeId() {
    this.recipeId = await this.mds.get("selectedRecipe");
    this.options['url'] = this.options.url.concat(`${this.recipeId}/information`);
  }

  async toggleFavourites() {
    // If favourites is null, instantiate it as an empty array
    this.favourites = await this.getFavourites();
    if (this.favourites.includes(this.recipeId)) {
      // assign this.favourites a new array without the current recipeId
      this.favourites = this.favourites.filter(v => v !== this.recipeId);
    } else {
      this.favourites.push(this.recipeId);
    }
    this.isFavourite = !this.isFavourite;
    this.updateFavouriteButtonText();
    await this.mds.set("favourites", this.favourites);
  }

  async getFavourites() {
    return await this.mds.get("favourites") || [];
  }

  async isRecipeAFavourite() {
    let result =  await this.getFavourites();
    this.isFavourite = result.includes(this.recipeId);
    this.updateFavouriteButtonText();
  }

  updateFavouriteButtonText() {
    if(this.isFavourite) {
      this.favouriteButtonText = "Remove from Favourites";
    } else {
      this.favouriteButtonText = "Add to Favourites ❤";
    }
  }



}
