import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Post } from "../posts/post-list/post.model";
import { Upload } from "../uploads/uploads";
import * as firebase from "firebase";


@Injectable()
export class PostService {

  postList: AngularFireList<any>;
  selectedPost: Post = new Post();
  private uploadTask: firebase.storage.UploadTask;

  constructor( private firebase :AngularFireDatabase ) { }

  getData(){
    this.postList = this.firebase.list('posts');
    return this.postList;
  }


  


  insertPost(post : Post)
  {
    this.postList.push({
      title: post.title,
      body: post.body,

    });
  }

  getPost ($key: string) {

    return this.firebase.database.ref('/posts/'+$key);

  }


  updatePost(post : Post){
    this.postList.update(post.$key,
      {
        title: post.title,
        body: post.body,

      });
  }

  deletePost($key : string){
    this.postList.remove($key);
  }

}
