import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  constructor(
    public fireauth: AngularFireAuth,
    private router: Router
  ) {}
  ngOnInit() {}

  login() {
    this.fireauth.signInWithEmailAndPassword(this.username,this.password)
    .then((result) => {
      this.router.navigate(['/main'])
    })
    .catch((error) => {
      console.log(error)
    })
  }

  google() {
    this.loginWithProvider(new GoogleAuthProvider())
  }

  loginWithProvider(provider: AuthProvider) {
    this.fireauth.signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['/main'])
    })
    .catch((error) => {
      console.log(error)
    })
  }

}
