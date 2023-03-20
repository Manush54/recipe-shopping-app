import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor (
      private activeRoute: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router) {}

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
    // const newRecipe = new Recipe(
    //     this.recipeForm.value['name'], 
    //     this.recipeForm.value['description'],
    //     this.recipeForm.value['imagePath'],
    //     this.recipeForm.value['ingredients']
    // )
    console.log(this.recipeForm.value)
    
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }

    this.backToRecipes();
  }

  onCancel() {
    this.backToRecipes();
  }

  private initForm(){

    let recipeName = ''
    let recipeImagepath = ''
    let recipeDescription = ''
    const recipeingredients = new FormArray([])

    
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      
      recipeName = recipe.name;
      recipeImagepath = recipe.imagePath
      recipeDescription = recipe.description

      if(recipe['ingredients']) {
        for(const ingredient of recipe.ingredients){
          recipeingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagepath, Validators.required),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeingredients
    })
  }

  onAddIngredient () {
    (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      )
  }

  onDeleteIngrediant(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onClearIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).clear()
  }

  private backToRecipes() {
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

}
