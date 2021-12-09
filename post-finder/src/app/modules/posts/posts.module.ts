import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts-display-page/posts.component';
import { ListComponent } from './components/list/list.component';
import { ListItemPostComponent } from './components/list-item-post/list-item-post.component';
import { SearchAndFindComponent } from './components/search-and-find/search-and-find.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { AutoBidComponent } from 'src/app/shared/components/auto-bid/auto-bid.component';
import { NavComponent } from 'src/app/shared/components/nav/nav.component';

@NgModule({
  declarations: [
    PostsComponent,
    ListComponent,
    ListItemPostComponent,
    SearchAndFindComponent,
    NavComponent,
    AutoBidComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    AutocompleteLibModule,
    FormsModule
  ]
})
export class PostsModule { }
