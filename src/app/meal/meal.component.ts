import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassifierService } from '@app/services/classifier.service'

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor(private route: ActivatedRoute, private classifierService: ClassifierService) { }

  meal:any = null;

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const mealId = Number(routeParams.get('mealId'))
    this.classifierService.getMealData(mealId).subscribe((req:any) =>{
      let ingredients:Array<string> = [];
      req.body.extendedIngredients.forEach((ingr:any) => {
        ingredients.push(ingr.original);
      })
      this.meal = {"title": req.body.title, "img" : req.body.image, "instructions": req.body.instructions.replace(/(<\/[^>]*>)|<[^>]+>/ig, ' '), "ingredients": ingredients};
    });
  }

}