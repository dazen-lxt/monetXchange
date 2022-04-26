import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private router: Router,
    private firestore: AngularFirestore,
  ) {}
  ngOnInit() {
  }

  login() {
    this.fireauth.signInWithEmailAndPassword(this.username,this.password)
    .then((result) => {
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
      this.fireauth.currentUser.then((currentUser) => {
        const userRef =  this.firestore.collection('users').doc(currentUser?.uid)
        userRef.get().subscribe(user => {
          if(user.exists) {
            this.goToMain()
          } else {
            userRef.set(
              {
                'displayName': currentUser?.displayName,
                'email': currentUser?.email,
                'photoURL': currentUser?.photoURL
              }
            )
            this.goToMain()
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  goToMain() {
    this.router.navigate(['/main'])
  }
}
