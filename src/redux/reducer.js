import { combineReducers } from "redux";

const initialState = {
    data: [],
    total: 0,
    hideNum: '',
    searchBy: [' _active', '', 'title'],
    sortBy: [' _active', '', 'release_date'],
    value: '',
    resultsFor: ['', ''],
    loading: '',
    notFound: '',
    networkErr: '',
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_MOVIE':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        movieName: action.payload.title,
                        movieYear: action.payload.release_date.slice(0, 4),
                        movieGenre: action.payload.genres,
                        moviePoster: action.payload.poster_path,
                    }
                ]
            };
            case 'ADD_MOVIE_IMG':
                return {
                    ...state,
                    data: [
                        ...state.data,
                        {
                            movieName: action.payload.title,
                            movieYear: action.payload.release_date.slice(0, 4),
                            movieGenre: action.payload.genres,
                            moviePoster: `./img/cinema.jpg`,
                        }
                    ]
                };
        case 'CLEAR': 
            return {
                ...state,
                data: [],
            };
        case 'NUMBER':
            return {
                ...state,
                total: action.payload.total,
                hideNum: ' _active',
            };
        case 'NUMBER_HIDE':
            return {
                ...state,
                hideNum: '',
            };
        case 'TITLE':
            return {
                ...state,
                searchBy: [' _active', '', 'title'],
            };
        case 'GENRES':
            return {
                ...state,
                searchBy: ['', ' _active', 'genres'],
            };
        case 'RATING':
            return {
                ...state,
                sortBy: ['', ' _active', 'vote_average'],
            };
        case 'DATE':
            return {
                ...state,
                sortBy: [' _active', '', 'release_date'],
            };
        case 'VALUE':
            return {
                ...state,
                value: action.payload.value,
            };
        case 'RESULTS':
            return {
                ...state,
                resultsFor: [' _active', action.payload.results],
            };
        case 'RESULTS_HIDE':
            return {
                ...state,
                resultsFor: ['', ''],
            };
        case 'LOADING':
            return {
                ...state,
                loading: ' _active',
            };
        case 'LOADED':
            return {
                ...state,
                loading: '',
            };
        case 'NOT_FOUND':
            return {
                ...state,
                notFound: ' _active',
            };
        case 'FOUND':
            return {
                ...state,
                notFound: '',
            };
        case 'ERROR':
            return {
                ...state,
                networkErr: ' _active',
            };
        case 'SUCCESS':
            return {
                ...state,
                networkErr: '',
            };
        default:
            return state;
            
    };
};

export default reducer;
