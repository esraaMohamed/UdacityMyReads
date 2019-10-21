import React, { Component } from 'react';

class ChangeShelves extends Component {
    onChange = (newShelf, currentShelf) => {
        this.props.handleOnChangeShelf(currentShelf, newShelf)
    }

    render() {
        const { currentShelf } = this.props;
        return (
            <button>
                <div className="book-shelf-changer">
                    <select onChange={(event) => this.onChange(event.target.value,currentShelf)} defaultValue={currentShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </button>
        )
    }
}

export default ChangeShelves;