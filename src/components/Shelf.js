import React from 'react';

const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfName}</h2>
        </div>
    )
}

export default Shelf;