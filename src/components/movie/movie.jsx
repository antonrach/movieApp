import React from 'react';
import mainDispatcher from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Movie = (props) => {

    const value = useSelector((state) => state.value);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);

    const dispatch = useDispatch();
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
                            backgroundImage: `url(${ props.moviePoster })`,
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
                                /*onClick={() => {
                                    dispatch(mainDispatcher(item, 'genres', sortBy[2], true));
                                }}*/
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
