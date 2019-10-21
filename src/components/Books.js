import React, { Component } from "react";
import Book from "./Book";
import Shelf from "./Shelf";
import { get } from "../BooksAPI";

class Books extends Component {
  state = {
    books: this.props.books
  };

  handleChange = (result) => {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    result.currentlyReading.map(id => {
      return get(id).then(book => currentlyReading.push(book))
    });
    result.wantToRead.map(id => {
      return get(id).then(book => wantToRead.push(book))
    });
    result.read.map(async id => {
      return get(id).then(book => read.push(book))
    });
    const newResult = { currentlyReading, wantToRead, read };
    this.setState({ books: newResult })
    console.log("new result", newResult)
    console.log("books state", this.state.books)
    this.props.handleBookUpdate(this.state.books);
  };

  render() {
    const { books } = this.state;
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