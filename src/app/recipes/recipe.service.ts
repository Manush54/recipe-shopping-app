/* Recipe Service:
 * To only make one instance of the Event Emitter and Recipes array, and make them available
 * for any file to use. 
*/
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {
    private recipes : Recipe[] = [
        new Recipe(
          'A Test Recipe', 
          'This is simply a test', 
          'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg',
          [new Ingredient('Rava', 500), new Ingredient('Oil', 100)]
          ),
          new Recipe(
            'A Test Recipe 2', 
            'This is a complicated test', 
            'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg',
            [new Ingredient('Rava', 500), new Ingredient('Water', 500)]
        )
      ];

      constructor(private slService: ShoppingListService) {}
   
      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index]
      }

      addingredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addingredients(ingredients)
      }
}