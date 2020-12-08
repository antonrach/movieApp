import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';

let ready = false;


const Header = () => {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const searchBy = useSelector((state) => state.searchBy);
    const sortBy = useSelector((state) => state.sortBy);
    const inputValue = useSelector((state) => state.input);

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
                        <Link to={urlGenerator('', 0, 'title', sortBy[2])} >
                            Find any movie here!
                        </Link>
                        
                    </span></p>
                    <form
                        className="search-movie"
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                                location.href = urlGenerator(value, 0, searchBy[2], sortBy[2]);
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
                            className={searchBy[0]}
                            onClick={ () => {
                                dispatch({type: 'TITLE'});
                                localStorage.setItem('searchBy', 'TITLE');
                            }}
                        >
                            title
                        </button>
                        <button
                            type="button"
                            className={searchBy[1]}
                            onClick={ () => {
                                dispatch({type: 'GENRES'});
                                localStorage.setItem('searchBy', 'GENRES');
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
