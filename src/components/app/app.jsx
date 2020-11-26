import React, { useState, useEffect } from 'react';
import Header from '../header';
import MovieArea from '../movieArea';
import Footer from '../footer';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <div className="movies">
                <Header />
                <MovieArea />
                <Footer />
            </div>
        </Provider>
    )
}

export default App;
