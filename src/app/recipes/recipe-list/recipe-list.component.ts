import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes : Recipe[];
  // Subscription for getting new/updated recipes from recipe-edit/recipe-new
  subscription: Subscription

  constructor(private recipeService: RecipeService, 
            private router: Router,
            private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.activeRoute})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
