import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private posts: Post[] = [];

  constructor() {}

  getPosts() {
    return [...this.posts];
  }

  addPost(post: Post) {
    const newPost: Post = {
      title: post.title,
      content: post.content,
    };

    this.posts.push(newPost);
  }
}
