import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post-display-page/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';


@NgModule({
  declarations: [
    PostComponent,
    PostDetailsComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
