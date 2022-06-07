import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  @Input() posts = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
}
