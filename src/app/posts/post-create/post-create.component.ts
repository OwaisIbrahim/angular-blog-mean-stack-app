import { PostsService } from './../posts.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: any;

  constructor(public postsService: PostsService, public router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
        console.log(this.post);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost(postForm: NgForm) {
    if ( postForm.invalid ) {
      return;
    }
    const post: Post = {
      id: null,
      title: postForm.value.title,
      content: postForm.value.content
    };
    if (this.mode === 'create') {
      this.postsService.addPost(post);
    } else {
      this.postsService.updatePost(this.postId, post);
    }
    postForm.resetForm();
  }
}
