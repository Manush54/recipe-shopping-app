import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingrediants: Ingrediant[]
  // Subscription for ingrediantsChanged recieved from shopping lisst service
  private subscription: Subscription
  
  
  constructor(private shoppingListService: ShoppingListService) {
  }
  
  ngOnInit(): void {
    this.ingrediants = this.shoppingListService.getIngrediants()
    this.subscription = this.shoppingListService.ingrediantsChanged
      .subscribe(
        (ingrediants: Ingrediant[]) => {
          this.ingrediants = ingrediants
        }
      )
  }

  onEditItem (index: number){
    this.shoppingListService.startedEditing.next(index)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
