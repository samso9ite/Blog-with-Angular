import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { postService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})


export class PostsListComponent implements OnInit{
  // @Input() posts: Post[]= []
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: postService){}
  
  ngOnInit() {
      this.posts = this.postService.getPost()
      this.postSub = this.postService.getPostUpdateListener().subscribe((posts:Post[]) => {
        this.posts = posts
      })
  }
  
  ngOnDestroy(){
    this.postSub.unsubscribe()
  }
}
