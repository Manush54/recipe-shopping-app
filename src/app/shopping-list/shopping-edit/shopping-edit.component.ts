import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static: false}) slForm: NgForm
  
  subscription: Subscription
  editMode = false
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
    
  }

  ngOnInit(): void {
    // Subscribe to the events passed by the shopping-list component
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getingredient(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  /** onAddingredientDetails()
   *  Aim - Emit the submitted details of the ingredient to be added.
   *  Fetched by Shopping-list-component to add the ingredient to the current ingredients list.
   * */
  onAddingredientDetails(form: NgForm){
    const value = form.value
    const newingredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shoppingListService.updateingredient(this.editedItemIndex, newingredient)
    } else {
      this.shoppingListService.addingredient(newingredient)
    }
    this.clearForm()
  }
  
  onDeleteingredient() {
    this.shoppingListService.deleteingredient(this.editedItemIndex)
    this.clearForm()
  }
  
  clearForm() {
    this.slForm.reset()
    this.editMode = false
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
