import { Ingrediant } from "../shared/ingrediant.model"
import { EventEmitter } from "@angular/core"
import { Subject } from "rxjs"
export class ShoppingListService {
    // Subject to emit if the ingrediants have changed
    ingrediantsChanged = new Subject<Ingrediant[]>()
    startedEditing = new Subject<number>()
    
    private ingrediants : Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomatoes', 10)
    ]
    
    getIngrediants() {
        return this.ingrediants.slice()
    }

    getIngrediant(index: number) {
        return this.ingrediants[index]
    }
    
    addIngrediant(newIngrediant: Ingrediant){
        this.ingrediants.push(newIngrediant)
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
    
    addIngrediants(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants)
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }

    updateIngrediant(index: number, newIngrediant: Ingrediant) {
        this.ingrediants[index] = newIngrediant
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
    
    deleteIngrediant(index:number) {
        this.ingrediants.splice(index, 1)
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
}