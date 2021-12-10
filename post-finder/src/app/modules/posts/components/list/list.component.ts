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
  @Input() categories: any;
  @Input() minMax = {min:0, max:0};
  @Output() selectChange = new EventEmitter();
  @Output() filter = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {

  }
  selectChangeHandler(item: any) {
    console.log(item);
    
    this.selectChange.emit( item );}

  filterHandler(item: any) {
    this.filter.emit( item );
  }
  identify(index: any, item: { category: any; }) {
    return item.category;
  }
}
