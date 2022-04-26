import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';

interface Debt {
  debtor: string;
  payer: string;
  amount: number;
}

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

  addDebtsForm = this.formBuilder.group({
    payer: ['', [Validators.required]],
    debtor: ['', [Validators.required]],
    amount: [null, [Validators.required]],
  });

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    const collection = firestore.collection<Debt>('debts');
    collection
      .valueChanges()
      .subscribe(
        (result) => (this.debtsTableData = new MatTableDataSource(result))
      );
  }
  ngOnInit(): void {}
}
