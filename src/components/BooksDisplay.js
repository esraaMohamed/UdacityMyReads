import React, { Component } from 'react';
import Books from "./Books";
import { getAll } from '../BooksAPI'
import { Link } from 'react-router-dom'

class BooksDisplay extends Component {
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
        this.setState({loading: true})
        getAll()
            .then(result => {
                this.filterBooks(result)
            })
            .catch(error => {
                this.setState({errorState: error})
            })
            .finally(() => {
                this.setState({loading: false})
            })
    };

    filterBooks = (books) => {
        books.map(book => {
            if (book.shelf === "currentlyReading") {
                const newCurrentlyReadingArray = this.state.books.currentlyReading;
                newCurrentlyReadingArray.push(book);
                const newBooks = {...this.state.books, currentlyReading: newCurrentlyReadingArray}
                this.setState({books: newBooks})
            } else if (book.shelf === "wantToRead") {
                const newWantToReadArray = this.state.books.wantToRead;
                newWantToReadArray.push(book);
                const newBooks = {...this.state.books, wantToRead: newWantToReadArray}
                this.setState({books: newBooks})
            } else if (book.shelf === "read") {
                const newReadArray = this.state.books.read;
                newReadArray.push(book);
                const newBooks = {...this.state.books, read: newReadArray}
                this.setState({books: newBooks})
            } else if (book.shelf === "none") {
                console.log("None")
            }
            return "Invalid shelf"
        })
    };

    handleBookUpdate = (newBooks) => {
        this.setState({books: newBooks})
    };

    render() {
        return (
            <div>
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {!this.state.loading &&
                            <Books books={this.state.books} handleBookUpdate={this.handleBookUpdate}/>}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
            </div>
        )
    }
}

export default BooksDisplay;