import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo')
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user: any, token:any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('token', token);

  }

  signIn(email: string, password: string) {
    this.http.post<any>(
      `${environment.serverURL}${environment.login}`,
      { user: { "username": email, "password": password } }
    ).subscribe(data => {
      // console.log(data);
      this.token = data.access_token;
      this.setUserInfo({ "username": email, "password": password }, this.token);
      this.router.navigate(['/posts']);
    })
  }
  signOut() {
    localStorage.clear();
  }
}
