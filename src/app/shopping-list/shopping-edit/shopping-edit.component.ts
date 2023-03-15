import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, NgModel } from '@angular/forms';
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
  editedItem: Ingrediant;

  constructor(private shoppingListService: ShoppingListService) {
    
  }

  ngOnInit(): void {
    // Subscribe to the events passed by the shopping-list component
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngrediant(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  /** onAddIngrediantDetails()
   *  Aim - Emit the submitted details of the ingrediant to be added.
   *  Fetched by Shopping-list-component to add the ingrediant to the current ingrediants list.
   * */
  onAddIngrediantDetails(form: NgForm){
    const value = form.value
    const newIngrediant = new Ingrediant(value.name, value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngrediant(this.editedItemIndex, newIngrediant)
    } else {
      this.shoppingListService.addIngrediant(newIngrediant)
    }
    this.clearForm()
  }
  
  onDeleteIngrediant() {
    this.shoppingListService.deleteIngrediant(this.editedItemIndex)
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
