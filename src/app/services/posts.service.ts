import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getLikedPosts(){
    return this.http.get('http://localhost:8000/liked_posts/me', {observe: 'response', withCredentials:true})
  }

  likePost(postId:Number){
    let body = {"post_id": postId};
    return this.http.post('http://localhost:8000/like', body, {observe: 'response', withCredentials:true})
  }

  dislikePost(postId:Number){
    let body = {"post_id" : postId};
    return this.http.delete('http://localhost:8000/dislike', {observe: 'response', withCredentials:true, body:body})
  }
}
