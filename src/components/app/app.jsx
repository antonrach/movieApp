import React, { useState, useEffect } from 'react';
import Header from '../header';
import MovieArea from '../movieArea';
import Footer from '../footer';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
  } from 'react-router-dom';
import store from '../../redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="movies">
                    <Header />
                    <MovieArea />
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
