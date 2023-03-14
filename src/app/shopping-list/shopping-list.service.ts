import { Ingrediant } from "../shared/ingrediant.model"
import { EventEmitter } from "@angular/core"

export class ShoppingListService {
    ingrediantsChanged = new EventEmitter<Ingrediant[]>()
    
    private ingrediants : Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomatoes', 10)
    ]
    
    getIngrediants() {
        return this.ingrediants.slice()
    }
    
    addIngrediant(newIngrediant: Ingrediant){
        this.ingrediants.push(newIngrediant)
        this.ingrediantsChanged.emit(this.ingrediants.slice())
    }
    
    addIngrediants(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants)
        this.ingrediantsChanged.emit(this.ingrediants.slice())
    }
}