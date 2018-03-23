import { Component, OnInit } from '@angular/core';
import { Post } from "./post.model";
import { PostService } from "../../services/post.service";
import {Item} from "../../shop-items/shared/shop.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList : Post[];

  constructor(private posttService: PostService) { }

  ngOnInit() {

    var z = this.posttService.getData();
    z.snapshotChanges().subscribe(item => {

      this.postList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.postList.push(y as Post);

      });
    });

  }

  onEdit(emp: Post) {
    this.posttService.selectedPost = Object.assign({}, emp);
  }

  onDelete(key: string) {

      this.posttService.deletePost(key);


  }

}
