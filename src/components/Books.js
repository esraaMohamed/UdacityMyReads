import React, { Component } from "react";
import Book from "./Book";
import Shelf from "./Shelf";

class Books extends Component {

  handleChange = (result) => {
      this.props.handleBookUpdate(result);
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
