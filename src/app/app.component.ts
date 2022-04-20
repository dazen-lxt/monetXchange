import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monetxchange';
  username: string = ''
  password: string = ''

  constructor(
    public fireauth: AngularFireAuth
  ) {}

  login() {
    this.fireauth.signInWithEmailAndPassword(this.username,this.password)
    .then((result) => {
      console.log(result);
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
      console.log(result);
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
