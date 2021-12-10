import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { bot } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserId(): number {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return JSON.parse(userData).id;
    }
    return -1;
  }
  getUserName(): string {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return JSON.parse(userData).username;
    }
    return '';
  }
  getBot(): bot | null {
    let botData = localStorage.getItem('bot');
    if (botData && JSON.parse(botData)) {
      return JSON.parse(botData);
    }
    return null;
  }
  token = '';
  user: { "username": string, "password": string, id: number } = { "username": "", "password": "", id: 0 }
  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo')
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user: any, token: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('token', token);

  }

  signIn(email: string, password: string) {
    this.http.post<any>(
      `${environment.serverURL}${environment.login}`,
      { user: { "username": email, "password": password } }
    ).subscribe(data => {
      // console.log(data);
      if (data.status === 'success') {
        this.token = data.access_token;
        let user = { "username": email, "password": password, id: data.userId }
        this.setUserInfo(user, this.token);
        this.user = user;
        this.setBot();
        this.router.navigate(['/posts']);
      }
      else {
        alert(data.status);
      }
    })
  }
  setBot() {
    this.http.get<any>(
      `${environment.serverURL}${environment.endPoint}/getBot`,
      { headers: { 'Authorization': `Bearer ${this.token}` } }
    ).subscribe(data => {
      localStorage.setItem('bot', JSON.stringify(data));
    })
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
