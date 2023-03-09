import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingrediant } from 'src/app/shared/ingrediant.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent{

  @ViewChild('nameInput', {static:true}) nameInput: ElementRef
  @ViewChild('amountInput', {static:true}) amountInput: ElementRef
  
  @Output() addIngrediant = new EventEmitter<Ingrediant>()
  
  onSubmitDetails(){
    this.addIngrediant.emit({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value
    })
  }
}
