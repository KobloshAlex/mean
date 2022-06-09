import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  private mode = "create";
  private postId: string;
  post: Post;

  @Output() postCreatedEvent = new EventEmitter<Post>();

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postService.getPost(this.postId).subscribe((postData) => {
          console.log(postData);
          this.post = {
            id: postData.post._id,
            title: postData.post.title,
            content: postData.post.content,
          };
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    const { content, title } = form.value;
    if (!form.valid) return;

    if (this.mode === "create") {
      const post: Post = {
        id: null,
        title: title,
        content: content,
      };

      this.postService.addPost(post);
    } else {
      this.postService.updatePost(this.postId, title, content);
    }

    form.resetForm();
  }
}
