import React from 'react';
import Details from '../details';
import MovieRows from '../movieRows';
import { useSelector } from 'react-redux';
import {
    Route,
    Switch,
    Redirect,
    Link,
  } from 'react-router-dom';
import Pagination from '../pagination';
import urlGenerator from '../../utils/urlGenerator';

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
                        <Link to={urlGenerator(value, offset, searchBy[2], sortBy[2])} >
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
                            <Link to={urlGenerator(value, 0, searchBy[2], 'release_date')} >
                                Release date
                            </Link>
                        </button>
                        <button
                            type="button"
                            className={sortBy[1]}
                        >
                            <Link to={urlGenerator(value, 0, searchBy[2], 'vote_average')} >
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
