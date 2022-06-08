import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor() {}

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(post: Post) {
    const newPost: Post = {
      title: post.title,
      content: post.content,
    };

    this.posts.push(newPost);
    this.postUpdated.next([...this.posts]);
  }
}
