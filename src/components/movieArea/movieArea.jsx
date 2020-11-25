import React, { useState, useEffect } from 'react';
import Movie from '../movie';
import MovieRows from '../movieRows';

const MovieArea = () => {
    return (
        <div className="movie-area">
            <div className="container">
                <div className="results">
                    <div className="number">8 movies found</div>
                    <div className="sort-by">
                        <p>Sort by:</p>
                        <button type="button" className="">Release date</button>
                        <button type="button" className="">Rating</button>
                    </div>
                </div>
                <MovieRows />
            </div>
        </div>
    )
}

export default MovieArea;
