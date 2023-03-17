import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { postService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  // enteredTitle= ''
  // enteredValue= ''
//  @Output() postCreated = new EventEmitter()

constructor(public postService:postService){}

  onAddPost(form:NgForm){
    // const post:Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // }
    if(form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content)
  // this.postCreated.emit(post);
}
}