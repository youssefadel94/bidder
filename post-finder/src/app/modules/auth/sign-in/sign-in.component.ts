import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  signIn() {
    this.auth.signIn(this.email,this.password);
  }
}
