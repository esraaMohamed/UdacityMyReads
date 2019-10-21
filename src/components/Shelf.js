import React from 'react';

const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h1>{props.shelfName}</h1>
        </div>
    )
}

export default Shelf;