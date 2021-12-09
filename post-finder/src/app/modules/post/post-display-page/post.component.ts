import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces/post';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: number = 0;
  post!: Post;
  constructor(private route: ActivatedRoute, private Router: Router, private Posts: PostsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(post => {
      this.id = post.id;
      this.Posts.getPost(post.id).subscribe(post => {
        this.post = post;console.log(post);
        
      })
    });
  }
  backButtonPressed() {
    this.Router.navigate(['/posts']);
  }
}
