import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from '@firebase/util';
import { debounceTime, finalize, switchMap, tap } from 'rxjs';
import { Debt, User } from 'src/app/models/debt';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})

export class AddTransactionComponent implements OnInit {

  addDebtsForm = this.formBuilder.group({
    debtor: ['', [Validators.required]],
    amount: [, [Validators.required]],
  });

  isLoadingUsers = false
  users: User[] = []
  currentUser = "";

  constructor(
    private router: Router,
    public fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let that = this;
    this.fireauth.onAuthStateChanged(function(user) {
      if (user != null) {
        that.currentUser = user?.uid
      } else {
        that.router.navigate([''])
      }
    });

    
    this.addDebtsForm.controls['debtor'].valueChanges
    .pipe(
      debounceTime(500),
      switchMap(value => this.firestore
        .collection<User>('users', ref => {
          return ref.orderBy('displayName').startAt(value).endAt(value + '~');
        })
        .valueChanges({ idField: 'eventId' })
        .pipe(
          finalize(() => {
            this.isLoadingUsers = false
          })
        )
      )
    ).subscribe(data => {
      this.users = data;
      console.log(data)
    })
  }

  postTransaction() {
    const collection = this.firestore.collection<Debt>('debts');
    let debtorId = this.addDebtsForm.get('debtor')?.value.eventId
    if(debtorId) {
      collection.add({
        payer: this.currentUser,
        debtor: debtorId,
        amount: this.addDebtsForm.get('amount')?.value,
      }).then((result) => alert(result) )
    }
  }

  onBlurDebtor() {
    let debtor = this.addDebtsForm.get('debtor')?.value
    if(!debtor.eventId) {
      this.addDebtsForm.controls['debtor'].setValue('')
    }
  }

  displayFn(user: User) {
    return user.displayName;
  }
  
}

