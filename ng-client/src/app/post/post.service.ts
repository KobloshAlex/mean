import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>("http://localhost:3000/api/posts")
      .subscribe((response) => {
        this.posts = response.posts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(post: Post) {
    const newPost: Post = {
      id: null,
      title: post.title,
      content: post.content,
    };

    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe((response) => {
        console.log(response);
        this.posts.push(newPost);
        this.postUpdated.next([...this.posts]);
      });
  }
}
