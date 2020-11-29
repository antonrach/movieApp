import React, { useState, useEffect } from 'react';
import Details from '../details';
import MovieRows from '../movieRows';
import { useSelector, useDispatch } from 'react-redux';
import addMovie from '../../redux/actions';
import pageCreator from '../../utils/pageCreator';

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

    const totalPages = Math.ceil(num / 12);

    const [newPages, setNP] = useState([]);

    useEffect(() => {
        const pages = [];
        pageCreator(pages, totalPages, (offset + 1));
        setNP(pages);
    }, [num, offset]);

    useEffect(() => {
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
    
            dispatch(addMovie(newValue, newSearch, newSort, false, false, +newOffset));
        } else {
            dispatch(addMovie('', searchBy[2], sortBy[2]));
        }
    }, []);
    
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
                            dispatch(addMovie(value, searchBy[2], sortBy[2], false, false, offset));
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
                            }}
                        >
                            Rating
                        </button>
                    </div>
                </div>
                <MovieRows />
                <div className="pages">
                    {newPages.map((item, id) => {
                        if(id === 0) {
                            if(item === (offset + 1)) {
                                return (
                                    <span
                                        key={id + 1}
                                        className="page-num _active"
                                        onClick={() => {
                                            dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, 0));
                                        }}
                                    >
                                        {item}
                                    </span>
                                )
                            } else {
                                return (
                                    <div key={id + 10} className="pagecont">
                                        <span
                                            key={id}
                                            className="page-num"
                                            onClick={() => {
                                                dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, 0));
                                            }}
                                        >
                                            &#60;
                                        </span>
                                        <span
                                            key={id + 1}
                                            className="page-num first"
                                            onClick={() => {
                                                dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, (item - 1)));
                                            }}
                                        >
                                            {item}
                                        </span>
                                    </div>
                                )
                            }
                        } else if (id === (newPages.length - 1)) {
                            if(item === (offset + 1)) {
                                return (
                                        <span
                                            key={id + 1}
                                            className="page-num _active"
                                            onClick={() => {
                                                dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, (item - 1)));
                                            }}
                                        >
                                            {item}
                                        </span>
                                )
                            } else {
                                return (
                                    <div key={id + 10} className="pagecont">
                                        <span
                                            key={id + 1}
                                            className="page-num sec"
                                            onClick={() => {
                                                dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, (item - 1)));
                                            }}
                                        >
                                            {item}
                                        </span>
                                        <span
                                            key={id + 2}
                                            className="page-num"
                                            onClick={() => {
                                                dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, (totalPages - 1)));
                                            }}
                                        >
                                            &#62;
                                        </span>
                                    </div>
                                )
                            }
                        } else {
                            if(item === (offset + 1)) {
                                return (
                                <span
                                    key={id + 1}
                                    className="page-num _active"
                                    onClick={() => {
                                        dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, (item - 1)));
                                    }}
                                >
                                    {item}
                                </span>
                                )
                            } else {
                                return (
                                    <span
                                        key={id + 1}
                                        className="page-num"
                                        onClick={() => {
                                            dispatch(addMovie(value, searchBy[2], sortBy[2], true, false, (item - 1)));
                                        }}
                                    >
                                        {item}
                                    </span> 
                                )
                            }
                        }        
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieArea;
