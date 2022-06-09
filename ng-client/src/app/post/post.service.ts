import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((post) => {
        this.posts = post;
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
      .post<{ message: string; postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe((response) => {
        newPost.id = response.postId;

        this.posts.push(newPost);
        this.postUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http.delete(`http://localhost:3000/api/posts/${id}`).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<any>(
      `http://localhost:3000/api/posts/${id}`
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id,
      title,
      content,
    };

    this.http.put(`http://localhost:3000/api/posts/${id}`, post).subscribe((response) => {
      //update front-end copy locally
      const updatedPost = [...this.posts];
      const oldPostIndex = updatedPost.findIndex((p) => p.id === post.id);
      updatedPost[oldPostIndex] = post;
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    });
  }
}
