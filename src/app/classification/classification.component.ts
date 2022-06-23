import { Component, OnInit } from '@angular/core';
import { ClassifierService } from '../classifier.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {

  constructor(private classifierService: ClassifierService, private userSvc:UserService) { }


  image: File;
  mealResults: Array<any> = [];

  ngOnInit(): void {
  }

  onChange(event:any) {
    this.image = event.target.files[0];
  }

  upload(){
    this.classifierService.classify(this.image).subscribe((req:any) => {
      if (req.status === 401){
        this.userSvc.logout();
      }
      else{
        //Get the result, then work.
        let meal = req.body.prediction;
        let mealSearch = this.classifierService.searchMeals(meal).subscribe((mealReq:any) => {
          if (mealReq.status === 200){
            mealReq.body.results.forEach((item:any) => {
              this.mealResults.push({"id": item.id, "title": item.title, "img" : item.image});
            })
          }
        });
      }
    });
  }
}