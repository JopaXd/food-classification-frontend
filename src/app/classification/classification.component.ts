import { Component, OnInit } from '@angular/core';
import { ClassifierService } from '../classifier.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {

  constructor(private classifierService: ClassifierService) { }


  image: File;

  ngOnInit(): void {
  }

  onChange(event:any) {
    this.image = event.target.files[0];
  }

  upload(){
    this.classifierService.classify(this.image).subscribe(
      (result:any) => {
        // Handle result
        let prediction = result.body.prediction;
        console.log(prediction);
      },
      error => {
        console.log(error.status)
      },
      () => {
        // 'onCompleted' callback.
      }
    );
  }
}