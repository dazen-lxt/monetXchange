import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Debt } from 'src/app/models/debt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  debtsTableData: MatTableDataSource<any> = new MatTableDataSource();
  debtsTableColumns: string[] = ['payer', 'debtor', 'amount'];
  @ViewChild('debtsTable', { read: MatSort, static: true })
  debtsTable: MatSort = new MatSort();

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    const collection = this.firestore.collection<Debt>('debts');
    collection
      .valueChanges()
      .subscribe(
        (result) => (this.debtsTableData = new MatTableDataSource(result))
      );
  }

  addTransaction() {
    this.router.navigate(['/add-transaction'])
  }
}