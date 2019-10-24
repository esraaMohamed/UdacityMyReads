import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./SearchPage";
import BooksDisplay from "./BooksDisplay";
import {get, getAll} from "../BooksAPI";

class Main extends Component {
  state = {
    loading: false,
    errorState: null,
    booksIndex: {},
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
        const updatedBookIndex = this.state.booksIndex
        updatedBookIndex[book.id] = book.shelf
        this.setState({booksIndex: updatedBookIndex})
      } else if (book.shelf === "wantToRead") {
        const newWantToReadArray = this.state.books.wantToRead;
        newWantToReadArray.push(book);
        const newBooks = {
          ...this.state.books,
          wantToRead: newWantToReadArray
        };
        this.setState({ books: newBooks });
        const updatedBookIndex = this.state.booksIndex
        updatedBookIndex[book.id] = book.shelf
        this.setState({booksIndex: updatedBookIndex})
      } else if (book.shelf === "read") {
        const newReadArray = this.state.books.read;
        newReadArray.push(book);
        const newBooks = { ...this.state.books, read: newReadArray };
        this.setState({ books: newBooks });
        const updatedBookIndex = this.state.booksIndex
        updatedBookIndex[book.id] = book.shelf
        this.setState({booksIndex: updatedBookIndex})
      } else if (book.shelf === "none") {
        console.log("None");
      }
      return "Invalid shelf";
    });
  };

  handleBookUpdate = (newBooks) => {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    let newResult = {};
    newBooks.currentlyReading && newBooks.currentlyReading.map(id => {
      return get(id).then(book => {
        currentlyReading.push(book);
        newResult.currentlyReading = currentlyReading;
        this.setState({books: newResult});
      })
    });
    newBooks.wantToRead && newBooks.wantToRead.map(id => {
      return get(id).then(book => {
        wantToRead.push(book);
        newResult.wantToRead = wantToRead;
        this.setState({books: newResult});
      })
    });
    newBooks.read && newBooks.read.map(id => {
      return get(id).then(book => {
        read.push(book);
        newResult.read = read;
        this.setState({books: newResult});
      })
    });
    console.log(newBooks)
    this.setState({booksIndex: newBooks});
  };

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <BooksDisplay books={this.state.books} handleBookUpdate={this.handleBookUpdate} />
        </Route>
        <Route path="/search">
          <SearchPage handleBookUpdate={this.handleBookUpdate} booksIndex={this.state.booksIndex}/>
        </Route>
      </Switch>
    );
  }
}

export default Main;
