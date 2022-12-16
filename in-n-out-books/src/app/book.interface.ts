/**
 * Title: book.interface.ts
 * Author: Manel Phiseme
 * Date: 20 November 2022
 * Description: book component
 */

export interface IBook {
  isbn: string;
  title: string;
  authors: Array<string>;
  description: string;
  numOfPages: number;

}
