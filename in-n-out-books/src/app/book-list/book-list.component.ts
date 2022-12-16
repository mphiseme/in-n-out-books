import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { IBook } from '../book.interface';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Array<IBook> = [];
 book!: any;


  bookObj: IBook = {
    isbn: '',
    title: '',
    authors: [],
    description: '',
    numOfPages: 0,
  };

  constructor(private booksService: BooksService, private dialog: MatDialog) {
    this.booksService.getBooks().subscribe((res) => {
      console.log('res is Here!!', res);

      let key: keyof typeof res;

      for (key in res) {
        if (res.hasOwnProperty(key)) {
          let authors = [];
          // if (res[key ].details.authors){
          //   authors = res[key].details.authors.map(function(author){
          //     return author.name
          //   })
          // }

          // this.books.push({
          //   isbn: res[key].details.isbn_13 ? res[key].details.isbn_13 : res[key].details.isbn_10,
          //   title: res[key].details.title,
          //   description: res[key].details.subtitle ? res[key].details.subtitle : 'N/A',
          //   numOfPages: res[key].details.number_of_pages,
          //   authors: authors
          // })

          for (const [prop, value] of Object.entries(res[key])){
            if(prop == 'details'){
              console.log(`${prop}: ${value}`);
              console.log('details value: ', value.isbn_10[0]);

              console.log('subtile',value.subtitle)
              if (value.title) {
                this.bookObj.title = value.title
              } else {
                this.bookObj.title = "N/A"
              }
              if (value.isbn_13.length >  0) {
                this.bookObj.isbn = value.isbn_13[0]
              } else {
                this.bookObj.isbn = value.isbn_10[0];
              }
              if (value.description) {
                this.bookObj.description = value.description.value
              } else {
                this.bookObj.description = "N/A";
              }
              if (value.numOfPages) {
                this.bookObj.numOfPages = value.number_of_pages
              } else {
                this.bookObj.numOfPages = 0;
              }
              if (value.authors) {
                this.bookObj.authors = value.authors
              } else {
                this.bookObj.authors = [];
              }

            }

            console.log('books', this.bookObj )

            this.books.push(this.bookObj)
          }
        }
      }
    });
  }

  ngOnInit(): void {}

  showBookDetails(isbn: string) {
    this.book   = this.books.find((book) => book.isbn === isbn);

    console.log("this.book", this.book);
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      data: {
        book: this.book,
      },
      disableClose: true,
      width: '800px',
    });
    console.log("another book", this.book);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.book.isbn = '';
        this.book.authors = [];
        this.book.description = '';
        this.book.title = '';
        this.book.numOfPages = 0;
      }
    });
  }
}
