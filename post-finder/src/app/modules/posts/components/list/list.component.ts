import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() posts: Post[] = [];
  @Input() displayPosts: Post[] = [];
  @Input() autoComplete!: any;
  @Input() error = "";
  @Output() selectChange = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {

  }
  selectChangeHandler(item: any) {
    console.log(item);
    
    this.selectChange.emit( item );}

}
