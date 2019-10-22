import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SearchPage from "./SearchPage";
import BooksDisplay from './BooksDisplay';

const Main = () => {
        return (
            <Switch>
                <Route exact path='/' component={BooksDisplay} />>
                <Route path='/search' component={SearchPage}/>>
            </Switch>
        )
}

export default Main;