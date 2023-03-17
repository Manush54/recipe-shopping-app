/* Recipe Service:
 * To only make one instance of the Event Emitter and Recipes array, and make them available
 * for any file to use. 
*/
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>

    // private recipes : Recipe[] = [
    //     new Recipe(
    //       'A Test Recipe', 
    //       'This is simply a test', 
    //       'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg',
    //       [new Ingredient('Rava', 500), new Ingredient('Oil', 100)]
    //       ),
    //       new Recipe(
    //         'A Test Recipe 2', 
    //         'This is a complicated test', 
    //         'https://assets.cntraveller.in/photos/60ba1de12267328f9d2456f0/master/pass/dosa-recipes-1366x768.jpg',
    //         [new Ingredient('Rava', 500), new Ingredient('Water', 500)]
    //     )
    //   ];

    private recipes : Recipe[] = []
      constructor(private slService: ShoppingListService) {}
      
      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes
        this.recipesChanged.next(this.recipes.slice())
      }
   
      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index]
      }

      addingredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addingredients(ingredients)
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
      }
      
      updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe
        this.recipesChanged.next(this.recipes.slice())
      }
      
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
      }

      
}