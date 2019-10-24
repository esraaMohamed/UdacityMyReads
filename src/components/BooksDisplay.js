import React, { Component } from 'react';
import Books from "./Books";
import { Link } from 'react-router-dom'

class BooksDisplay extends Component {
    state = {
        loading: false,
      };
    
    handleBookUpdate = (newBooks) => {
        this.props.handleBookUpdate(newBooks);
    };

    render() {
        const { books } = this.props;
        return (
            <div>
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {!this.state.loading &&
                            <Books books={books} handleBookUpdate={this.handleBookUpdate}/>}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'></Link>
                    </div>
            </div>
        )
    }
}

export default BooksDisplay;