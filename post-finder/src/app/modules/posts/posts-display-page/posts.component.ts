import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces/post';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  displayPosts: Post[] = [];
  limit: number = 3;
  autoComplete: any;
  error = "";
  constructor(private Router: Router, private Posts: PostsService) {
    this.Posts.getPosts().subscribe((Posts) => {

      this.posts = Posts
      this.displayPosts = this.Posts.getDisplayPosts(Posts, this.limit)
      this.autoComplete = this.Posts.getAutoComplete(Posts);


    });
   }

  ngOnInit(): void {
    
  }
  selectChangeHandler(item: any) {
    console.log(item);
    this.error = "";
    item.name ?
      this.Router.navigate(['/post'], { queryParams: { id: JSON.stringify(item.id) } }) :
      this.Posts.getPost(item.id).subscribe(item => { item ? this.Router.navigate(['/post'], { queryParams: { id: JSON.stringify(item.id) } }):this.error ="not found on server"});
  }
}
