import React, { useEffect, useRef } from 'react';
import Movie from '../movie';
import { useDispatch, useSelector } from 'react-redux';
import addMovie from '../../redux/actions';
import { parse } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';

//require('dotenv').config();
const multiplyOffset = +process.env.MULTIPLY_OFFSET;

const MovieRows = () => {

    const dispatch = useDispatch();

    const movies = useSelector((state) => state.data);
    const num = +useSelector((state) => state.total);
    const changeOffset = useSelector((state) => state.changeOffset);
    const networkErr = useSelector((state) => state.networkErr);
    const totalPages = Math.ceil(num / multiplyOffset);

    const location = useLocation();
    const history = useHistory();
    const prevId = useRef('The first prevId');
    const prevValue = useRef('');
    const { value, offset, sortBy, searchBy, id } = parse(location.search);

    useEffect(() => {
        const sortArr = ['vote_average', 'release_date', undefined];
        const searchArr = ['title', 'genres', undefined];

        if((id === undefined && prevId.current === id) ||
        (id === undefined && prevId.current !== undefined && prevValue.current !== value && searchBy === 'genres') ||
        (prevId.current === 'The first prevId')
        ) {
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
        }

        prevId.current = id;
        prevValue.current = value;
    }, [history.location.key])

    useEffect(() => {
        if((+offset >= 0 && +offset < totalPages) || offset === undefined) {
            return
        }
        if(+totalPages !== 0 && !networkErr) {
            history.push(urlGenerator({value, searchBy, sortBy}));
        }
    }, [changeOffset])

    //http://localhost:4200/?value=lord&offset=8&searchBy=title&sortBy=release_date

    return (
        <div className="movie-rows">
            {
                movies.map((item) => (
                    <Movie
                        movieTittle={item.title}
                        key={item.id}
                        movieYear={item.release_date.slice(0, 4)}
                        movieGenres={item.genres}
                        moviePoster={item.poster_path}
                        id={item.id}
                    />
                ))
            }
        </div>
    )
}

export default MovieRows;
