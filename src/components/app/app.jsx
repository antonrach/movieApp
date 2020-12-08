import React, { useEffect } from 'react';
import Header from '../header';
import MovieArea from '../movieArea';
import Footer from '../footer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/store';
import handleFirstTab from '../../utils/outlineToggler';

const App = () => {

    useEffect(() => {
        window.addEventListener('keydown', handleFirstTab);
    }, []);

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
