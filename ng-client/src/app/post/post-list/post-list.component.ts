import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts = [];
  postSubscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe((result: Post[]) => {
      this.posts = result;
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}
