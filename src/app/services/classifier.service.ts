import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {

  constructor(private http: HttpClient) { }

  classify(image:File){
    const formData = new FormData(); 
    formData.append("img", image, image.name);
    return this.http.post('http://localhost:8000/classify', formData, {observe: 'response', withCredentials:true});
  }
}