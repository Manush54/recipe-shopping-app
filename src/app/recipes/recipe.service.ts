/* Recipe Service:
 * To only make one instance of the Event Emitter and Recipes array, and make them available
 * for any file to use. 
*/
import { Injectable } from "@angular/core";
import { Ingrediant } from "../shared/ingrediant.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {
    private recipes : Recipe[] = [
        new Recipe(
          'A Test Recipe', 
          'This is simply a test', 
          'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg',
          [new Ingrediant('Rava', 500), new Ingrediant('Oil', 100)]
          ),
          new Recipe(
            'A Test Recipe 2', 
            'This is a complicated test', 
            'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg',
            [new Ingrediant('Rava', 500), new Ingrediant('Water', 500)]
        )
      ];

      constructor(private slService: ShoppingListService) {}
   
      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index]
      }

      addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
        this.slService.addIngrediants(ingrediants)
      }
}