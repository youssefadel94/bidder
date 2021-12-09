import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from './shared/services/auth-route-guard.service';
// lazy load all routes and apply basic guard to them 
const routes: Routes = [
  { path: "", redirectTo: "posts", pathMatch: "full" },
  
  { path: 'posts', loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule), canActivate: [AppRouteGuard] },
  { path: 'post', loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule),canActivate: [AppRouteGuard] },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),canActivate: [AppRouteGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
