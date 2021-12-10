import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Post, bidDto, bot } from 'src/app/shared/interfaces/post';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: number = 0;
  post!: Post;
  bot: any;
  botChecked: boolean= false;
  constructor(private route: ActivatedRoute, private Router: Router, private Posts: PostsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(post => {
      this.id = post.id;
      this.Posts.getPost(post.id).subscribe(post => {
        this.post = post;console.log(post);
        this.bot = this.Posts.getBot();
//check if this.bot.posts contains this.post.id if yes then set botChecked to true
        if (this.bot.posts.includes(this.post.id)) {
          this.botChecked = true;
        }
        else {
          this.botChecked = false;
        }
        
      })
    });
    this.Posts.getPostSnapshotChange().subscribe((Posts) => {
      console.log(Posts);
    });
  }
  backButtonPressed() {
    this.Router.navigate(['/posts']);
  }
  placeBid(bid:number) {
    let bidInput = {userId:this.auth.getUserId(),amount:bid,post:this.post} as bidDto;
    this.Posts.makeBid(bidInput).subscribe(post => {
      // console.log(post);
      
      this.post.currentBid = bid;
    });
  }
  placeBot(item: any) {
    debugger
    if (item.target.value) {
      this.bot.posts.push(this.post);
      this.Posts.makeBot(this.bot)
    } else {
      this.bot.posts.splice(this.bot.posts.indexOf(this.post.id), 1);
      this.Posts.makeBot(this.bot)
    }
  }
  updateBot(bot:any) {
    this.Posts.makeBot(bot);
  }
  ngOnDestroy() {
    this.Posts.closePostSnapshot();
  }
}
