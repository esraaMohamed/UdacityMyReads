import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search, get } from "../BooksAPI";
import Book from "./Book";

class SearchPage extends Component {
  state = {
    searchResult: [],
    existingBooks: this.props.books,
    errorState: null
  };

  searchForBooks = (query, maxResult) => {
    search(query, maxResult)
      .then(result => {
        this.setState({ searchResult: result });
        this.setState({ errorState: null });
      })
      .catch(error => {
        this.setState({ errorState: error });
      })
      .then(error => {
        this.displayError(this.state.errorState);
      });
  };

  handleShelfChange = result => {
    const { existingBooks } = this.state;
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    let newResult = {};
    result.currentlyReading.map(id => {
      return get(id).then(book => {
        if (existingBooks.currentlyReading.indexOf(book) !== -1) {
          currentlyReading.push(book);
          newResult.currentlyReading = currentlyReading;
          this.props.handleBookUpdate(newResult);
        } else {            
          return book.shelf;
        }
      });
    });
    result.wantToRead.map(id => {
      return get(id).then(book => {
        if (existingBooks.wantToRead.indexOf(book) !== -1) {
          wantToRead.push(book);
          newResult.wantToRead = wantToRead;
          this.props.handleBookUpdate(newResult);
        } else {
          return book.shelf;
        }
      });
    });
    result.read.map(id => {
      return get(id).then(book => {
        if (existingBooks.read.indexOf(book) !== -1) {
          read.push(book);
          newResult.read = read;
          this.props.handleBookUpdate(newResult);
        } else {
          return book.shelf;
        }
      });
    });
  };

  displayError = error => {
    return <p>{error}</p>;
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.searchForBooks(event.target.value, 5)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!this.state.errorState &&
              this.state.searchResult.map(book => (
                <li key={book.id}>
                  <Book book={book} handleChange={(shelf) => this.handleShelfChange} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
