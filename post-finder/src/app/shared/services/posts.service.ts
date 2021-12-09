import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { bidDto, filterDto, Post } from "../interfaces/post";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http: HttpClient) { }

  /**get list of all posts
   * @return {*}  {Observable<post[]>}
   * @memberof PostService
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.serverURL}${environment.endPoint}`);
  }
  /**
   * get post by id
   *
   * @param {number} id
   * @return {*}  {Observable<Post>}
   * @memberof PostsService
   */
  getPost(id:number): Observable<Post> {
    return this.http.get<Post>(`${environment.serverURL}${environment.endPoint}/${id}`);
  }
  getPostsFiltered(filter: filterDto) {
    return this.http.post<Post[]>(`${environment.serverURL}${environment.filter}`, filter);
  }
   

  makeBid(bid: bidDto) {
    return this.http.post(`${environment.serverURL}${environment.endPoint}`, bid);
  
   }
  /**gets a list of posts to display
 * @param {product[]} Posts
 * @param {number} limit
 * @return {*} {product[]}
 * @memberof PostService
 */
  getDisplayPosts(Products: Post[], limit: number): Post[] {
    var displayProducts = [];
    for (var product in Products) {
      if (displayProducts.length < limit)
        displayProducts.push(Products[product]);
      if (displayProducts.length === limit) break;
    }
    return displayProducts;
  }
  /**
   *get auto complete array form products list
   *
   * @param {Post[]} Posts
   * @return {*}  {*}
   * @memberof PostsService
   */
  getAutoComplete(Posts: Post[]): any {
    var res = [];
    for (var post in Posts) {
      res.push({ id: Posts[post].id, name: `${Posts[post].title}`})
    }
    return res;
  }

}
