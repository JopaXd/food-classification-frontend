import { Component, OnInit } from '@angular/core';
import { PostsService } from '@app/services/posts.service';
import { MealService } from '@app/services/meal.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent implements OnInit {

  constructor(private postsService: PostsService, private mealService: MealService, private userSvc:UserService) { }

  meals: Array<any> = [];

  ngOnInit(): void {
    this.postsService.getLikedPosts().subscribe((req:any) => {
      if (req.status === 200){
        let mealIds:Array<Number> = [];
        let posts:Array<any> = req.body.posts;
        posts.forEach((post:any) => {
          mealIds.push(post.postId);
        })
        mealIds.forEach((mealId:Number) => {
          this.mealService.getMealData(mealId).subscribe((mealData:any) => {
            this.meals.push({"title": mealData.body.title, "img":mealData.body.image, "id": mealId});
          })
        })
      }
      else if (req.status === 401){
        this.userSvc.logout();
      }
    })
  }

}
