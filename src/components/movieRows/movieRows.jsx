import React, { useState, useEffect } from 'react';
import Movie from '../movie';

const MovieRows = () => {
    return (
        <div className="movie-rows">
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
        </div>
    )
}

export default MovieRows;
