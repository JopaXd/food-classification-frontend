import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) { }

  searchMeals(meal:string){
    return this.http.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9c54f69379a14940a84de8a38e0b5c74&query=${meal}`, {observe: 'response'});
  }

  getMealData(mealId:Number){
    return this.http.get(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=9c54f69379a14940a84de8a38e0b5c74`, {observe: 'response'});
  }
}
