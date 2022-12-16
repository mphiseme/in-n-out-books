/**
 * Title: book-details.component.ts
 * Author: Manel Phiseme
 * Date: 20 November 2022
 * Description: Composer list component
 */
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBook } from '../book.interface';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent implements OnInit {
  book !: IBook;
  constructor(private dialogRef: MatDialogRef<BookDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) data:any){
   this.book = data.book;
   }

  ngOnInit(): void {
  }

}
