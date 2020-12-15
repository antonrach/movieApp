import React, { useEffect } from 'react';
import Movie from '../movie';
import { useDispatch, useSelector } from 'react-redux';
import addMovie from '../../redux/actions';
import { parse } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';

const MovieRows = () => {

    const dispatch = useDispatch();

    const movies = useSelector((state) => state.data);
    const num = +useSelector((state) => state.total);
    const totalPages = Math.ceil(num / 12);

    const location = useLocation();
    const history = useHistory();
    const { value, offset, sortBy, searchBy } = parse(location.search);

    useEffect(() => {
        const sortArr = ['vote_average', 'release_date', undefined];
        const searchArr = ['title', 'genres', undefined];
        if(!sortArr.includes(sortBy) || !searchArr.includes(searchBy)) {
            let srt = sortBy; 
            let srch = searchBy;
            if(!sortArr.includes(sortBy)) {
                srt = 'release_date';
            }
            if(!searchArr.includes(searchBy)) {
                srch = 'title';
            }
            history.push(urlGenerator({sortBy: srt, searchBy: srch, value, offset}));
        } else {
            dispatch(addMovie(value, searchBy, sortBy, offset));
        }
    }, [history.location.key])

    useEffect(() => {
        if((+offset >= 0 && +offset < totalPages) || offset === undefined) {
            return
        }
        if(+totalPages !== 0) {
            history.push(urlGenerator({value, searchBy, sortBy}));
        }
    }, [movies, totalPages])

    //http://localhost:4200/?value=lord&offset=8&searchBy=title&sortBy=release_date

    return (
        <div className="movie-rows">
            {
                movies.map((item, id) => (
                    <Movie
                        movieTittle={item.title}
                        key={id}
                        movieYear={item.release_date.slice(0, 4)}
                        movieGenres={item.genres}
                        moviePoster={item.poster_path}
                        movieDesc={item.overview}
                        movieDate={item.release_date}
                        movieBudget={item.budget}
                        moviemovieRating={item.vote_average}
                    />
                ))
            }
        </div>
    )
}

export default MovieRows;
