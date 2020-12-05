import React, { useState, useEffect } from 'react';
import Details from '../details';
import MovieRows from '../movieRows';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
  } from 'react-router-dom';
import mainDispatcher from '../../redux/actions';
import pageCreator from '../../utils/pageCreator';
import Pagination from '../pagination';
import { Link } from 'react-router-dom';

const MovieArea = () => {

    const num = useSelector((state) => state.total);
    const offset = useSelector((state) => state.offset);
    const hideNum = useSelector((state) => state.hideNum);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);
    const value = useSelector((state) => state.value);
    const resultsFor = useSelector((state) => state.resultsFor);
    const loading = useSelector((state) => state.loading);
    const notFound = useSelector((state) => state.notFound);
    const networkErr = useSelector((state) => state.networkErr);
    const dispatch = useDispatch();


    /*useEffect(() => {
        if(
            localStorage.getItem('searchValue') !== null &&
            localStorage.getItem('sortBy') !== null &&
            localStorage.getItem('searchBy') !== null &&
            localStorage.getItem('offset') !== null
        ) {
            const newValue = localStorage.getItem('searchValue');
            const newSort = localStorage.getItem('sortBy');
            const newSearch = localStorage.getItem('searchBy');
            const newOffset = localStorage.getItem('offset');
    
            dispatch(mainDispatcher(newValue, newSearch, newSort, false, false, +newOffset));
        }
    }, []);*/
    
    return (
        <div className="movie-area">
            <div className="container">
                <Details />
                <div className={"loading" + loading}>
                    <p>Loading...</p>
                </div>
                <div className={"not-found" + notFound}>Sorry, cannot find your movie...</div>
                <div className={"not-found error" + networkErr}>
                    Sorry, cannot load this page.
                    Please, check your Internet connection.
                    <p
                        onClick={() => {
                            dispatch(mainDispatcher(value, searchBy[2], sortBy[2], false, false, offset));
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
                            /*onClick={() => {
                                const newSort = 'release_date';
                                dispatch(mainDispatcher(value, searchBy[2], newSort));
                            }}*/
                        >
                            <Link to={`/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=release_date`} >
                                Release date
                            </Link>
                        </button>
                        <button
                            type="button"
                            className={sortBy[1]}
                            /*onClick={() => {
                                const newSort = 'vote_average';
                                dispatch(mainDispatcher(value, searchBy[2], newSort));
                            }}*/
                        >
                            <Link to={`/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=vote_average`} >
                                Rating
                            </Link>
                        </button>
                    </div>
                </div>
                <Switch >
                    <Route exact path="/" component={MovieRows} />
                </Switch>
                <Pagination />
            </div>
        </div>
    )
}

export default MovieArea;
