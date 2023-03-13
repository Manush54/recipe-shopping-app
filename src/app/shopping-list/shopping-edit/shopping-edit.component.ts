import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent{

  // Fetching name and amount input to extract the values entered by the user
  @ViewChild('nameInput', {static:false}) nameInput: ElementRef
  @ViewChild('amountInput', {static:false}) amountInput: ElementRef
  
  // @Output() addIngrediant = new EventEmitter<Ingrediant>()
  constructor(private shoppingListService: ShoppingListService) {
    
  }


  /** onAddIngrediantDetails()
   *  Aim - Emit the submitted details of the ingrediant to be added.
   *  Fetched by Shopping-list-component to add the ingrediant to the current ingrediants list.
   * */
  onAddIngrediantDetails(){
    this.shoppingListService.addIngrediant(new Ingrediant(
            this.nameInput.nativeElement.value, 
            this.amountInput.nativeElement.value
        ))
    this.nameInput.nativeElement.value = ''
    this.amountInput.nativeElement.value = null
  }
}
