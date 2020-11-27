import React, { useState, useEffect } from 'react';
import Movie from '../movie';
import { useDispatch, useSelector } from 'react-redux';

const MovieRows = () => {

    const movies = useSelector((state) => state.data);

    return (
        <div className="movie-rows">
            {
                movies.map((item, id) => (
                    <Movie
                        movieTittle={item.movieName}
                        key={id}
                        movieYear={item.movieYear}
                        movieGenres={item.movieGenre}
                        moviePoster={item.moviePoster}
                        defaultImg={item.defaultImg}
                    />
                ))
            }
        </div>
    )
}

export default MovieRows;
