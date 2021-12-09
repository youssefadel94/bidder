import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-search-and-find',
  templateUrl: './search-and-find.component.html',
  styleUrls: ['./search-and-find.component.css']
})
export class SearchAndFindComponent implements OnInit {
  @Input()
  posts!: Post[];
  keyword = 'name';
  search = "search by name";
  id!: number;
  @Input() error = "";
  @Output() selectChange = new EventEmitter();

  
  constructor() { }

  ngOnInit(): void {
    
    
  }

  selectEvent(item: any) {
    this.selectChange.emit( item );
  }
  getEvent() {
    this.error = "";
    let item = { id: this.id }
    if (this.posts.some(e => e.id == this.id))
      this.selectChange.emit(item);
    else
      this.error = "not found"
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
}
