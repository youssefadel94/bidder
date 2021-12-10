import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { bidDto, filterDto, Post, bot } from "../interfaces/post";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class PostsService {



  constructor(private http: HttpClient, private auth: AuthService) { }
  posts = new BehaviorSubject<Post[]>([]);
  eventSource: any;
  bot: any;
  /**get list of all posts
   * @return {*}  {Observable<post[]>}
   * @memberof PostService
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.serverURL}${environment.endPoint}`);
  }
  getBot() {
    let bot = this.auth.getBot();
    this.bot = bot;
    return bot;
  }
  makeBot(bot: bot) {
    return this.http.post(`${environment.serverURL}${environment.bot}/`, bot);
  }

  /**
   * get post by id
   *
   * @param {number} id
   * @return {*}  {Observable<Post>}
   * @memberof PostsService
   */
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.serverURL}${environment.endPoint}/${id}`);
  }
  getPostsFiltered(filter: filterDto) {
    return this.http.post<Post[]>(`${environment.serverURL}${environment.filter}`, filter);
  }

  getPostSnapshotChange(): Observable<Post[]> {
    const eventSource = new EventSource(`${environment.serverURL}${environment.endPoint}/sse`);
    eventSource.onmessage = ({ data }) => {
      console.log('New message', JSON.parse(data));
      this.posts.next(JSON.parse(data));
    };
    this.eventSource = eventSource;
    return this.posts.asObservable();

  }
  closePostSnapshot() {
    this.eventSource.close();
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
      res.push({ id: Posts[post].id, name: `${Posts[post].title}` })
    }
    return res;
  }
  getCatagories(Posts: Post[]): any {
    var res = [];
    for (var post in Posts) {
      if (res.indexOf(Posts[post].category) === -1)
        res.push(Posts[post].category)
    }
    return res;
  }
  // a function that takes an array of posts and returns min and max currentBid
  getMinMaxBid(Posts: Post[]): any {
    var min = 0;
    var max = 0;
    for (var post in Posts) {
      if (Posts[post].currentBid > max)
        max = Posts[post].currentBid;
      if (Posts[post].currentBid < min)
        min = Posts[post].currentBid;
    }
    return { min: min, max: max };
  }


}
