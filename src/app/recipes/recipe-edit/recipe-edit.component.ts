import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id: number;
  editMode = false;
  imagesrc: string;

  recipeForm: FormGroup;

  constructor (
      private activeRoute: ActivatedRoute,
      private recipeService: RecipeService) {}

  ngOnInit () {
    this.activeRoute.params
      .subscribe(
        (params: Params) => {
           this.id = +params['id']
           this.editMode = params['id'] != null
           this.initForm()
        }
      )
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  private initForm(){

    let recipeName = ''
    let recipeImagepath = ''
    let recipeDescription = ''
    let recipeingredients = new FormArray([])

    
    if(this.editMode){
      let recipe = this.recipeService.getRecipe(this.id)
      
      recipeName = recipe.name;
      recipeImagepath = recipe.imagePath
      recipeDescription = recipe.description

      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients){
          recipeingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          )
        }
      }
    }
    
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagepath': new FormControl(recipeImagepath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeingredients
    })
  }
}
