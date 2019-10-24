import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

class SearchPage extends Component {
    state = {
        searchResult: [],
        errorState: null
    };

    searchForBooks = (query, maxResult) => {
        search(query, maxResult)
            .then(result => {
                this.setState({searchResult: result});
                this.setState({errorState: null});
            })
            .catch(error => {
                this.setState({errorState: error});
            })
            .then(error => {
                this.displayError(this.state.errorState);
            });
    };

    handleShelfChange = (result) => {
        this.props.handleBookUpdate(result);
    };

    displayError = error => {
        return <p>{error}</p>;
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"/>
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
