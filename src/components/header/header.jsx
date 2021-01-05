import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';

let ready = false;


const Header = () => {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const searchBy = useSelector((state) => state.searchBy);
    const sortBy = useSelector((state) => state.sortBy);
    const inputValue = useSelector((state) => state.input);
    const history = useHistory();

    useEffect(() => {
        if(ready) {
            setValue('');
        } else {
            ready = true;
        }
    }, [inputValue])

    return (
        <div className="header">
            <div className="darkheader">
                <div className="container">
                    <p className="exclamation"><span
                    >
                        <Link to={urlGenerator({ sortBy })} >
                            Find any movie here!
                        </Link>
                        
                    </span></p>
                    <form
                        className="search-movie"
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                                //location.href = urlGenerator({ value, searchBy, sortBy });
                                history.push(urlGenerator({ value, searchBy, sortBy }));
                            }
                        }
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                        />
                        <button
                            type="submit"
                        >
                            Go
                        </button>
                    </form>
                    <div className="search-settings">
                        <div className="search-by">Search by:</div>
                        <button
                            type="button"
                            className={(searchBy === 'title') ? '_active' : ''}
                            onClick={ () => {
                                dispatch({
                                    type: 'SEARCH_BY',
                                    payload: {
                                        searchBy: 'title',
                                    },
                                });
                            }}
                        >
                            title
                        </button>
                        <button
                            type="button"
                            className={(searchBy === 'genres') ? '_active' : ''}
                            onClick={ () => {
                                dispatch({
                                    type: 'SEARCH_BY',
                                    payload: {
                                        searchBy: 'genres',
                                    },
                                });
                            }}
                        >
                            genre
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
