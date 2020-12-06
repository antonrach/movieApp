import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Movie = (props) => {

    const value = useSelector((state) => state.value);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);

    const [bgImg, setBgImg] = useState(''); 

    const dispatch = useDispatch();

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
                <div
                    className="tandp"
                    onClick={() => {
                        dispatch({
                            type: 'MODAL',
                            payload: {
                                title: props.movieTittle,
                                genres: props.movieGenres,
                                description: props.movieDesc,
                                date: props.movieDate,
                                budget: props.movieBudget,
                                rating: props.moviemovieRating,
                            },
                        })
                    }}
                >
                    <div
                        className="poster"
                        style={{
                            backgroundImage: `url(${ bgImg })`,
                            backgroundSize: 'cover',
                        }}
                    ></div>
                    <div className="movie-title">
                        {props.movieTittle}
                    </div>
                </div>
                <div className="gandy">
                    <div className="genres">
                        {props.movieGenres.map((item, id) => (
                            <p
                                className="genre"
                                key={id}
                            >
                                <Link to={`/?value=${item}&offset=0&searchBy=genres&sortBy=${sortBy[2]}`} >
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
