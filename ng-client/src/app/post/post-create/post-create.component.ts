import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent {
  @Output() postCreatedEvent = new EventEmitter<Post>();

  constructor(private postService: PostService) {}

  onClick(form: NgForm) {
    if (!form.valid) return;

    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };

    this.postService.addPost(post);
    form.resetForm();
  }
}
