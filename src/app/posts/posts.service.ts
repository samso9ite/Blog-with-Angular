import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"

@Injectable({providedIn:'root'})
export class postService{
   private posts: Post[] = []
   private postsUpdated = new Subject<Post[]>();
   
   constructor(private http: HttpClient){}
   getPost(){
   //  return [...this.posts]
   this.http.get<{message:"string", posts:any}>('http://localhost:3000/api/posts')
   .pipe(map((postData) => {
    return postData.posts.map(post => {
      return {
        title: post.title,
        content: post.content,
        id: post._id
    };
   });
  }))
   .subscribe(transformedPosts => {
     this.posts = transformedPosts;
     this.postsUpdated.next([...this.posts])
   })
   }

   getPostUpdateListener(){
    return this.postsUpdated.asObservable();
   }

   addPost(title:string, content:string){
    const post: Post = {id:null, title:title, content:content}
    this.http.post<{message:string, postId:string}>('http://localhost:3000/api/aad-posts', post).subscribe((responseData) => {
      post.id = responseData.postId
      this.posts.push(post)
      this.postsUpdated.next([...this.posts])
    })
   }

  deletePost(postId:string){
    this.http.delete('http://localhost:3000/api/delete_post/'+postId).subscribe(res => {
      const updatedPost = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPost
      this.postsUpdated.next([...this.posts])
    })
   }
}