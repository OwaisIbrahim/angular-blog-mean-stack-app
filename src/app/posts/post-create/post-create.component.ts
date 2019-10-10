import { PostsService } from './../posts.service';
import { Component, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postsService: PostsService) {}

  onAddPost(postForm: NgForm) {
    if ( postForm.invalid ) {
      return;
    }

    const post: Post = {
      id: null,
      title: postForm.value.title,
      content: postForm.value.content
    };
    this.postsService.addPost(post);
    postForm.resetForm();
  }
}
