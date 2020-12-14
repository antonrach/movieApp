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
import SpecialPages from '../specialPages';

const MovieArea = () => {

    const num = useSelector((state) => state.total);
    const hideNum = useSelector((state) => state.hideNum);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);
    const value = useSelector((state) => state.value);
    
    return (
        <div className="movie-area">
            <div className="container">
                <Details />
                <SpecialPages />
                <div className={(value === '') ? "results-for" : "results-for _active"}>Results for <span>'{value}':</span></div>
                <div className={hideNum ? "results" : "results _active"}>
                    <div className="number">{num} movies found</div>
                    <div className="sort-by">
                        <p>Sort by:</p>
                        <button
                            type="button"
                            className={(sortBy === 'release_date') ? '_active' : ''}
                        >
                            <Link to={urlGenerator({value, searchBy})} >
                                Release date
                            </Link>
                        </button>
                        <button
                            type="button"
                            className={(sortBy === 'vote_average') ? '_active' : ''}
                        >
                            <Link to={urlGenerator({value, searchBy, sortBy: 'vote_average'})} >
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
