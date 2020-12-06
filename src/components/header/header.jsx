import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mainDispatcher from '../../redux/actions';
import { Link } from 'react-router-dom';
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
                        <Link to={`/?value=&offset=0&searchBy=title&sortBy=${sortBy[2]}`} >
                            Find any movie here!
                        </Link>
                        
                    </span></p>
                    <form
                        className="search-movie"
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                                location.href = `/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`
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
