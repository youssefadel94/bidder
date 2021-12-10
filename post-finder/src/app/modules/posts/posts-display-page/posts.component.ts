import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterDto, Post } from 'src/app/shared/interfaces/post';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  displayPosts: Post[] = [];
  limit: number = 10;
  autoComplete: any;
  error = "";
  minMax: any;
  categories: any;
  filter: filterDto = {
    status: "open",
    bid: { $gte: 0 },
    category: ''//\bMac\b.*\bExchangeWebServices\b
  }

  constructor(private Router: Router, private Posts: PostsService) {
    this.Posts.getPosts().subscribe((Posts) => {

      this.posts = Posts

      this.displayPosts = this.Posts.getDisplayPosts(Posts, this.limit)
      this.autoComplete = this.Posts.getAutoComplete(Posts);
      this.minMax = this.Posts.getMinMaxBid(Posts);
      this.categories = this.Posts.getCatagories(Posts);
      console.log(this.categories, this.minMax);


    });
  }

  ngOnInit(): void {

  }
  selectChangeHandler(item: any) {
    console.log(item);
    this.error = "";
    item.name ?
      this.Router.navigate(['/post'], { queryParams: { id: JSON.stringify(item.id) } }) :
      this.Posts.getPost(item.id).subscribe(item => { item ? this.Router.navigate(['/post'], { queryParams: { id: JSON.stringify(item.id) } }) : this.error = "not found on server" });
  }
  filterPosts(item: any) {
    // console.log(item);
    //check if item.type is 'change' or 'click' 
    if (item.type == 'change') {
      // console.log(item.target.value);
      this.filter.bid = { $gte: Number.parseInt(item.target.value) }
      // this.displayPosts = this.Posts.getDisplayPosts(this.posts, this.limit, item.value);
    }
    else {
      // console.log(item.target.value);
      this.filter.category.length?
        this.filter.category += `.*\b${item.target.value}\b` :
        this.filter.category = `\b${item.target.value}\b`
      // this.displayPosts = this.Posts.getDisplayPosts(this.posts, this.limit, item.value);
    }
    this.Posts.getPostsFiltered(this.filter).subscribe((Posts) => {
      this.displayPosts = this.Posts.getDisplayPosts(Posts, this.limit)
    }
    )
  }
}