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
    const resultsFor = useSelector((state) => state.resultsFor);
    const loading = useSelector((state) => state.loading);
    const notFound = useSelector((state) => state.notFound);
    const networkErr = useSelector((state) => state.networkErr);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addMovie(value, searchBy[2], sortBy[2]));
    }, []);
    
    return (
        <div className="movie-area">
            <div className="container">
                <div className={"loading" + loading}>
                    <p>Loading...</p>
                </div>
                <div className={"not-found" + notFound}>Sorry, cannot find your movie...</div>
                <div className={"not-found error" + networkErr}>
                    Sorry, cannot load this page.
                    Please, check your Internet connection.
                    <p
                        onClick={() => {
                            dispatch(addMovie(value, searchBy[2], sortBy[2]));
                        }}
                    >
                        CLICK TO RETRY
                    </p>
                </div>
                <div className={"results-for" + resultsFor[0]}>Results for <span>'{resultsFor[1]}':</span></div>
                <div className={"results" + hideNum}>
                    <div className="number">{num} movies found</div>
                    <div className="sort-by">
                        <p>Sort by:</p>
                        <button
                            type="button"
                            className={sortBy[0]}
                            onClick={() => {
                                const newSort = 'release_date';
                                dispatch(addMovie(value, searchBy[2], newSort));
                                dispatch({type: 'DATE'});
                            }}
                        >
                            Release date
                        </button>
                        <button
                            type="button"
                            className={sortBy[1]}
                            onClick={() => {
                                const newSort = 'vote_average';
                                dispatch(addMovie(value, searchBy[2], newSort));
                                dispatch({type: 'RATING'});
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
