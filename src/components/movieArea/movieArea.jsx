import React, { useState, useEffect } from 'react';
import Movie from '../movie';
import MovieRows from '../movieRows';
import { useSelector, useDispatch } from 'react-redux';
import addMovie from '../../redux/actions';

const MovieArea = () => {

    const num = useSelector((state) => state.total);
    const hideNum = useSelector((state) => state.hideNum);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);
    const value = useSelector((state) => state.value);
    const dispatch = useDispatch();
    
    return (
        <div className="movie-area">
            <div className="container">
                <div className={"results" + hideNum}>
                    <div className="number">{num} movies found</div>
                    <div className="sort-by">
                        <p>Sort by:</p>
                        <button
                            type="button"
                            className={sortBy[0]}
                            onClick={() => {
                                dispatch({type: 'DATE'});
                                dispatch(addMovie(value, searchBy[2], sortBy[2]));
                            }}
                        >
                            Release date
                        </button>
                        <button
                            type="button"
                            className={sortBy[1]}
                            onClick={() => {
                                dispatch({type: 'RATING'});
                                dispatch(addMovie(value, searchBy[2], sortBy[2]));
                            }}
                        >
                            Rating
                        </button>
                    </div>
                </div>
                <MovieRows />
            </div>
        </div>
    )
}

export default MovieArea;
