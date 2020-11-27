import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addMovie from '../../redux/actions';


const Header = () => {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const searchBy = useSelector((state) => state.searchBy);
    const sortBy = useSelector((state) => state.sortBy);

    return (
        <div className="header">
            <div className="darkheader">
                <div className="container">
                    <p className="exclamation"><span
                        onClick={() => {
                            dispatch(addMovie('', 'title', sortBy[2]));
                            dispatch({type: 'VALUE', payload: {value: ''}});
                            dispatch({type: 'TITLE'});
                            setValue('');
                        }}
                    >
                        Find any movie here!
                    </span></p>
                    <form
                        className="search-movie"
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                                dispatch(addMovie(value, searchBy[2], sortBy[2]));
                                dispatch({type: 'VALUE', payload: {value}});
                                setValue('');
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
                                setValue('');
                            }}
                        >
                            title
                        </button>
                        <button
                            type="button"
                            className={searchBy[1]}
                            onClick={ () => {
                                dispatch({type: 'GENRES'});
                                setValue('');
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
