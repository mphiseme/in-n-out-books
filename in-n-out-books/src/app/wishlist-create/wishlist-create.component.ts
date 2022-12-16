import { outputAst } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IWishlistItem } from '../wishlist-item.interface';

@Component({
  selector: 'app-wishlist-create',
  templateUrl: './wishlist-create.component.html',
  styleUrls: ['./wishlist-create.component.css']
})
export class WishlistCreateComponent implements OnInit {

  item: IWishlistItem;
  @Output() addItemEmitter= new EventEmitter<IWishlistItem>();

  constructor() {
    this.item = {} as IWishlistItem;
   }

  ngOnInit(): void {
  }
  addItem(){

    this.addItemEmitter.emit({
      title: this.item.title,
      authors: this.item.authors
    })
    this.item = {} as IWishlistItem;
  }


}
