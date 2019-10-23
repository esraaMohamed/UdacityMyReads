import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./SearchPage";
import BooksDisplay from "./BooksDisplay";
import { getAll } from "../BooksAPI";

class Main extends Component {
  state = {
    loading: false,
    errorState: null,
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    this.setState({ loading: true });
    getAll()
      .then(result => {
        this.filterBooks(result);
      })
      .catch(error => {
        this.setState({ errorState: error });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  filterBooks = books => {
    books.map(book => {
      if (book.shelf === "currentlyReading") {
        const newCurrentlyReadingArray = this.state.books.currentlyReading;
        newCurrentlyReadingArray.push(book);
        const newBooks = {
          ...this.state.books,
          currentlyReading: newCurrentlyReadingArray
        };
        this.setState({ books: newBooks });
      } else if (book.shelf === "wantToRead") {
        const newWantToReadArray = this.state.books.wantToRead;
        newWantToReadArray.push(book);
        const newBooks = {
          ...this.state.books,
          wantToRead: newWantToReadArray
        };
        this.setState({ books: newBooks });
      } else if (book.shelf === "read") {
        const newReadArray = this.state.books.read;
        newReadArray.push(book);
        const newBooks = { ...this.state.books, read: newReadArray };
        this.setState({ books: newBooks });
      } else if (book.shelf === "none") {
        console.log("None");
      }
      return "Invalid shelf";
    });
  };

  handleBookUpdate = newBooks => {
    this.setState({ books: newBooks });
  };

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <BooksDisplay books={this.state.books} handleBookUpdate={this.handleBookUpdate}/>
        </Route>
        <Route path="/search">
          <SearchPage handleBookUpdate={this.handleBookUpdate} filter={this.filterBooks} books={this.state.books}/>
        </Route>
      </Switch>
    );
  }
}

export default Main;
