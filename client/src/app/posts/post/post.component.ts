import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {



  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onSubmit(postForm: NgForm) {
    if (postForm.value.$key == null) {
      this.postService.insertPost(postForm.value);
    }
    else
      this.postService.insertPost(postForm.value);
    this.resetForm(postForm);
  }

  resetForm(itemForm?: NgForm) {

    if (itemForm != null)

      itemForm.resetForm();
    this.postService.selectedPost = {
      $key: null,
      title: '',
      body: '',

    }
  }

}
