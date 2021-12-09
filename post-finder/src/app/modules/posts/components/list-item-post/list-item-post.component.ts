import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-list-item-post',
  templateUrl: './list-item-post.component.html',
  styleUrls: ['./list-item-post.component.css']
})
export class ListItemPostComponent implements OnInit {
  @Input()
  post!: Post;
  @Output() selectHandler = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  selectEvent(item: any) {
    this.selectHandler.emit(item);
  }
}
