import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @Input() post: Post = {
    title: '', id: 0, body: '', postId: 0,
    startingBid: 0, currentBid: 0, bids: [],
    highestBidderId: 0, status: "open",
    createdAt: new Date(), updatedAt: new Date(),
    expiryDate: new Date(), category: ''
  };
  bid: number = 0;
  @Input() bot: any;
  @Input() botChecked: any;
  @Output() backButton = new EventEmitter();
  @Output() bidButton = new EventEmitter();
  @Output() botButton = new EventEmitter();
  @Output() botUpdateEventButton = new EventEmitter();
  botShow = false;
  constructor() { }

  ngOnInit(): void {


  }
  navigateBack() {
    this.backButton.emit();
  }
  bidEvent(bid: number) {
    this.bidButton.emit(bid);
  }
  botEvent(event: any) {
    this.botButton.emit(event);
  }
  showBot() {
    this.botShow = !this.botShow;
  }
  botUpdateEvent(bot: any) {
    this.botUpdateEventButton.emit(bot);
  }
}
