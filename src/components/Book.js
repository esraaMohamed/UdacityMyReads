import React, { Component } from 'react';
import ChangeShelves from "./ChangeShelves";
import ReactStars from 'react-stars'
import { update } from '../BooksAPI';

class Book extends Component {
    handleOnChangeShelf = (currentShelf, newShelf) => {
        const { book, handleChange } = this.props;
        if(currentShelf === newShelf) {
            console.log("No change, doing nothing")
            return "No change needed"
        } else if(currentShelf !== newShelf) {
            update(book, newShelf).then(result => {
                handleChange(result)
            })
        }
    }
    render() {
        const { book } = this.props;
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                    </div>
                    <ChangeShelves currentShelf={book.shelf ? book.shelf : 'none'} handleOnChangeShelf={this.handleOnChangeShelf} /> 
                </div>      
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
                <ReactStars name={book.title} value={book.averageRating} edit={false} half/>
            </div>
        )
    }
}

export default Book;
