import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassifierService } from '@app/services/classifier.service'
import { MealService } from '@app/services/meal.service'
import { PostsService } from '@app/services/posts.service'
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userSvc: UserService ,private classifierService: ClassifierService, private mealService: MealService, private postsService: PostsService) { }

  meal:any = null;
  mealId: Number;
  userLikedThisPost = false;
  likeBtnText = "Like";

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.mealId = Number(routeParams.get('mealId'));
    this.postsService.getLikedPosts().subscribe((req:any) => {
      for (let i = 0; i < req.body.posts.length; i++) {
        if (req.body.posts[i].postId === this.mealId){
          this.userLikedThisPost = true;
          this.likeBtnText = "Dislike";
          break;
        }
      }
    })
    this.mealService.getMealData(this.mealId).subscribe((req:any) =>{
      let ingredients:Array<string> = [];
      req.body.extendedIngredients.forEach((ingr:any) => {
        ingredients.push(ingr.original);
      })
      this.meal = {"title": req.body.title, "img" : req.body.image, "instructions": req.body.instructions.replace(/(<\/[^>]*>)|<[^>]+>/ig, ' '), "ingredients": ingredients};
    });
  }

  likeBtn_click(){
    if (this.userLikedThisPost === true){
      //Dislike
      this.postsService.dislikePost(this.mealId).subscribe((req:any) => {
        if (req.status === 200){
          this.userLikedThisPost = false;
          this.likeBtnText = "Like";
        }
        else if (req.status === 401){
          this.userSvc.logout();
        }
      });
      
    }
    else{
      //Like
      this.postsService.likePost(this.mealId).subscribe((req:any) => {
        if (req.status === 200){
          this.userLikedThisPost = true;
          this.likeBtnText = "Dislike";
        }
        else if (req.status === 401){
          this.userSvc.logout();
        }
      });
    }
  }

}