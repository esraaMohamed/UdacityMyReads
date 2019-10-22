import React from 'react'
import './App.css'
import Main from './components/Main'
import {BrowserRouter} from "react-router-dom";

class BooksApp extends React.Component {
    render() {
        return (
            <BrowserRouter>
              <Main/>
            </BrowserRouter>
        )
    }
}

export default BooksApp
