import React, {Component} from "react";
import {Link} from "react-router-dom";
import {search} from "../BooksAPI";
import Book from "./Book";

class SearchPage extends Component {
    state = {
        searchResult: [],
        errorState: null,
        books: this.props.books,
        query: ""
    };

    searchForBooks = (query, maxResult) => {
        this.setState(() => ({
            query: query.trim()
        }));
        const {books, errorState} = this.state;
        if (query !== "") {
            try {
                search(query, maxResult)
                    .then(results => {
                        if (results.length) {
                            for (const result of results) {
                                for (const book of books.currentlyReading) {
                                    if (result.id === book.id) {
                                        result["shelf"] = "currentlyReading";
                                    }
                                }
                                for (const book of books.wantToRead) {
                                    if (result.id === book.id) {
                                        result["shelf"] = "wantToRead";
                                    }
                                }
                                for (const book of books.read) {
                                    if (result.id === book.id) {
                                        result["shelf"] = "read";
                                    }
                                }
                            }
                            this.setState({searchResult: results})
                        } else {
                            this.displayError("Result set was empty")
                        }
                    })
            } catch (error) {
                this.setState({errorState: error});
                this.displayError(this.state.errorState);
            }
        } else {
            this.displayError(errorState)
        }
    };

    handleShelfChange = (result) => {
        this.props.handleBookUpdate(result);
    };

    displayError = error => {
        return <p>{error}</p>;
    };

    render() {
        const {searchResult, errorState} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"/>
                    <div className="search-books-input-wrapper">
                        <form>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={event => this.searchForBooks(event.target.value, 6)}
                            />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!errorState && searchResult &&
                        searchResult.map(book => (
                            <li key={book.id}>
                                <Book book={book} handleChange={this.handleShelfChange}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;
