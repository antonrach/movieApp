import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';
import { searchById } from '../../redux/actions';

const Movie = (props) => {

    const dispatch = useDispatch();

    const sortBy = useSelector((state) => state.sortBy);

    const [bgImg, setBgImg] = useState('./img/black.png');

    useEffect(() => {
        const img = new Image();
        img.src = props.moviePoster;
        img.onload = () => {
            setBgImg(props.moviePoster);
        }
        img.onerror = () => {
            setBgImg(`./img/cinema.jpg`);
        }
    }, [])
    return (
        <div className="movie">
            <div className="movie-cont">
                <button
                    className="tandp"
                    onFocus={(event) => {
                        if(document.querySelector('body').classList.contains('user-is-tabbing')) {

                        } else {
                            event.target.blur();
                        }
                    }}
                    onClick={() => {
                        dispatch(searchById(props.id));
                    }}
                >
                    <img src={bgImg} className="poster" />
                    <div className="movie-title">
                        {props.movieTittle}
                    </div>
                </button>
                <div className="gandy">
                    <div className="genres">
                        {props.movieGenres.map((item, id) => (
                            <p
                                className="genre"
                                key={id}
                            >
                                <Link to={urlGenerator({value: item, searchBy: 'genres', sortBy})} >
                                    {item}
                                </Link>
                            </p>
                        ))}
                    </div>
                    <div className="year">
                        {props.movieYear}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie;
