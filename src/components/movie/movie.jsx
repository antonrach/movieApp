import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';
import { searchById } from '../../redux/actions';

const Movie = (props) => {

    const sortBy = useSelector((state) => state.sortBy);
    const value = useSelector((state) => state.value);
    const searchBy = useSelector((state) => state.searchBy);
    const offset = +useSelector((state) => state.offset);

    const dispatch = useDispatch();

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
                <Link
                    to={urlGenerator({value, searchBy, sortBy, offset, id: props.id})}
                    onFocus={(event) => {
                        if(document.querySelector('body').classList.contains('user-is-tabbing')) {

                        } else {
                            event.target.blur();
                        }
                    }}
                >
                    <div
                        className="tandp"
                    >
                        <img src={bgImg} className="poster" />
                        <div className="movie-title">
                            {props.movieTittle}
                        </div>
                    </div>
                </Link>
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
