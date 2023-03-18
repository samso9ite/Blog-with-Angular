import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class postService{
   private posts: Post[] = []
   private postsUpdated = new Subject<Post[]>();
   
   constructor(private http: HttpClient){}
   getPost(){
   //  return [...this.posts]
   this.http.get<{message:"string", posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postsData) => {
     this.posts = postsData.posts;
     this.postsUpdated.next([...this.posts])
   })
   
   }

   getPostUpdateListener(){
    return this.postsUpdated.asObservable();
   }

   addPost(id:number, title:string, content:string){
    const post: Post = {id:id, title:title, content:content}
    this.posts.push(post)
    this.postsUpdated.next([...this.posts])
   }
}