import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userProfilePicture: string = ''
  
  constructor(
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {
    this.getUserInformation()
  }

  getUserInformation() {
    const collection = this.firestore.collection<User>('users').ref.where('email', '==', 'jcmartinezcano@gmail.com')
    collection.get().then(result => {
      this.userProfilePicture = result.docs[0].get('photoURL');
    }).catch(error => {
      this.userProfilePicture = ''
    })
  }

}
