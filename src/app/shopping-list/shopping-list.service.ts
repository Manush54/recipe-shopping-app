import { Ingrediant } from "../shared/ingrediant.model"
import { EventEmitter } from "@angular/core"
import { Subject } from "rxjs"
export class ShoppingListService {
    ingrediantsChanged = new Subject<Ingrediant[]>()
    
    private ingrediants : Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomatoes', 10)
    ]
    
    getIngrediants() {
        return this.ingrediants.slice()
    }
    
    addIngrediant(newIngrediant: Ingrediant){
        this.ingrediants.push(newIngrediant)
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
    
    addIngrediants(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants)
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
}