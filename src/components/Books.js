import React, { Component } from "react";
import Book from "./Book";
import Shelf from "./Shelf";
import { get } from "../BooksAPI";

class Books extends Component {

  handleChange = (result) => {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    let newResult = {};
    result.currentlyReading.map(id => {
      return get(id).then(book => {
          currentlyReading.push(book);
          newResult.currentlyReading = currentlyReading;
          this.props.handleBookUpdate(newResult);
      })
    });
    result.wantToRead.map(id => {
      return get(id).then(book => {
          wantToRead.push(book);
          newResult.wantToRead = wantToRead;
          this.props.handleBookUpdate(newResult);
      })
    });
    result.read.map(async id => {
      return get(id).then(book => {
          read.push(book);
          newResult.read = read;
          this.props.handleBookUpdate(newResult);
      })
    });
  };

  render() {
    const { books } = this.props;
    return (
      <div className="list-books-content">
        <Shelf shelfName="Currently Reading" />
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.currentlyReading &&
              books.currentlyReading.map(book => (
                <li key={book.id}>
                  <Book book={book} handleChange={this.handleChange} />
                </li>
              ))}
          </ol>
        </div>
        <Shelf shelfName="Want To Read" />
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.wantToRead &&
              books.wantToRead.map(book => (
                <li key={book.id}>
                  <Book book={book} handleChange={this.handleChange} />
                </li>
              ))}
          </ol>
        </div>
        <Shelf shelfName="Read" />
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.read &&
              books.read.map(book => (
                <li key={book.id}>
                  <Book book={book} handleChange={this.handleChange} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Books;
