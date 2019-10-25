import React, {Component} from "react";
import {Link} from "react-router-dom";
import {get, search, update} from "../BooksAPI";
import Book from "./Book";

class SearchPage extends Component {
    state = {
        searchResult: [],
        booksIndex: this.props.booksIndex,
        errorState: null
    };

    searchForBooks = (query, maxResult) => {
        console.log("query", query)
        let newResults = [];
        search(query, maxResult)
            .then(result => {
                newResults = this.findBooks(result)
                console.log("then new results ",newResults)
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

    findBooks = (searchResult) =>  {
        let { booksIndex } = this.state;
        let newResult = []
        for(const index in booksIndex) {
            newResult = this.updateSearchResults(index, searchResult, booksIndex);
            console.log("in find books", newResult)
           // this.setState({searchResult: newResult})
        }
        return newResult;
    }

    updateSearchResults = (index, searchResult, booksIndex) => {
        console.log("search results in update", searchResult)
        let newResult = searchResult;
        searchResult.map(result => {
            return (result.id === index) ?
                update(result, booksIndex[index])
                    .then(updatedBooks => {
                        console.log("in update");
                        this.setState({booksIndex: updatedBooks})
                        get(result.id).then(book => {
                            book["shelf"] = booksIndex[index]
                            newResult = searchResult.filter(b => b.id !== book.id)
                            newResult.push(book)
                            this.setState({searchResult: newResult});
                            console.log(this.state.searchResult)
                        });
                    })
                : null
        });
        console.log("after update", newResult)
       return newResult;
    }

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
