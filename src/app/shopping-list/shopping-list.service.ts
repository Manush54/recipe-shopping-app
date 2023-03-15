import { Ingredient } from "../shared/ingredient.model"
import { EventEmitter } from "@angular/core"
import { Subject } from "rxjs"
export class ShoppingListService {
    // Subject to emit if the ingredients have changed
    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<number>()
    
    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
    
    getingredients() {
        return this.ingredients.slice()
    }

    getingredient(index: number) {
        return this.ingredients[index]
    }
    
    addingredient(newingredient: Ingredient){
        this.ingredients.push(newingredient)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    
    addingredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateingredient(index: number, newingredient: Ingredient) {
        this.ingredients[index] = newingredient
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    
    deleteingredient(index:number) {
        this.ingredients.splice(index, 1)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}