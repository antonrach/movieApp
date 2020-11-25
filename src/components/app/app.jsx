import React, { useState, useEffect } from 'react';
import Header from '../header';
import MovieArea from '../movieArea';
import Footer from '../footer';

const App = () => {
    return (
        <div className="movies">
            <Header />
            <MovieArea />
            <Footer />
        </div>
    )
}

export default App;
