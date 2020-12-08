import React, { useEffect } from 'react';
import Movie from '../movie';
import { useDispatch, useSelector } from 'react-redux';
import addMovie from '../../redux/actions';
import { parse } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

const MovieRows = () => {

    const dispatch = useDispatch();

    const movies = useSelector((state) => state.data);

    const location = useLocation();
    const history = useHistory();
    const { value, offset, sortBy, searchBy } = parse(location.search);

    useEffect(() => {
        dispatch(addMovie(value, searchBy, sortBy, offset));
    }, [history.location.key])

    //http://localhost:4200/?value=lord&offset=8&searchBy=title&sortBy=release_date

    return (
        <div className="movie-rows">
            {
                movies.map((item, id) => (
                    <Movie
                        movieTittle={item.movieName}
                        key={id}
                        movieYear={item.movieYear}
                        movieGenres={item.movieGenre}
                        moviePoster={item.moviePoster}
                        movieDesc={item.movieDesc}
                        movieDate={item.movieDate}
                        movieBudget={item.movieBudget}
                        moviemovieRating={item.movieRating}
                    />
                ))
            }
        </div>
    )
}

export default MovieRows;
