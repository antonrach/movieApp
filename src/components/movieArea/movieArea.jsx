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
import Pagination from '../pagination';
import { Link } from 'react-router-dom';

const MovieArea = () => {

    let mod;

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
                    <p>
                        <Link to={`/?value=${value}&offset=${offset}&searchBy=${searchBy[2]}&sortBy=release_date`} >
                            CLICK TO RETRY
                        </Link>
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
                        >
                            <Link to={`/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=release_date`} >
                                Release date
                            </Link>
                        </button>
                        <button
                            type="button"
                            className={sortBy[1]}
                        >
                            <Link to={`/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=vote_average`} >
                                Rating
                            </Link>
                        </button>
                    </div>
                </div>
                <Switch >
                    <Route exact path="/" component={MovieRows} />
                    <Redirect path="*" to="/" />
                </Switch>
                <Pagination />
            </div>
        </div>
    )
}

export default MovieArea;
