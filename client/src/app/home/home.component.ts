import { Component, OnInit  } from '@angular/core';
import { PostService} from "../services/post.service";
import { Post} from "../posts/post-list/post.model";

@Component({
  templateUrl: './home.component.html',
  providers : [PostService]
})
export class HomeComponent implements OnInit {

  private postmList : Post[];

  constructor(private postService: PostService){}

  ngOnInit() {

    var z = this.postService.getData();
    z.snapshotChanges().subscribe(item => {

      this.postmList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.postmList.push(y as Post);
        //console.log(this.itemList);

      });
    });

  }

}
