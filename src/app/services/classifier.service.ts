import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {

  constructor(private http: HttpClient) { }

  searchMeals(meal:string){
    return this.http.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9c54f69379a14940a84de8a38e0b5c74&query=${meal}`, {observe: 'response'});
  }

  classify(image:File){
    const formData = new FormData(); 
    formData.append("img", image, image.name);
    return this.http.post('http://localhost:8000/classify', formData, {observe: 'response', withCredentials:true});
  }

  getMealData(mealId:Number){
    return this.http.get(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=9c54f69379a14940a84de8a38e0b5c74`, {observe: 'response'});
  }
}