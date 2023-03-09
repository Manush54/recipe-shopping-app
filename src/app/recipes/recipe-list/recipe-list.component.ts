import { Component, EventEmitter, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent{

  recipes : Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg'),
    new Recipe('A Test Recipe 2', 'This is a complicated test', 'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg')
  ]

  @Output() recipeWasSelected = new EventEmitter<Recipe>()

  constructor() {
    console.log(this.recipes)
  }

  onRecipeSelected(recipeEl: Recipe) {
    this.recipeWasSelected.emit(recipeEl)
  }
}
