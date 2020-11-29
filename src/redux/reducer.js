import { combineReducers } from "redux";

const initialState = {
    data: [],
    total: 0,
    offset: 1,
    hideNum: '',
    searchBy: [' _active', '', 'title'],
    sortBy: [' _active', '', 'release_date'],
    value: '',
    resultsFor: ['', ''],
    loading: '',
    notFound: '',
    networkErr: '',
    input: false,
    modal: {
        open: '',
        title: '',
        genres: [],
        description: '',
        date: '',
        budget: '',
        rating: '',
    },
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
                        movieDesc: action.payload.overview,
                        movieDate: action.payload.release_date,
                        movieBudget: action.payload.budget,
                        movieRating: action.payload.vote_average,
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
                            movieDesc: action.payload.overview,
                            movieDate: action.payload.release_date,
                            movieBudget: action.payload.budget,
                            movieRating: action.payload.vote_average,
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
        case 'OFFSET':
            return {
                ...state,
                offset: action.payload.offset,
            };
        case 'NUMBER_HIDE':
            return {
                ...state,
                hideNum: '',
                total: 0,
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
        case 'INPUT':
            return {
                ...state,
                input: !state.input,
            };
        case 'MODAL':
            return {
                ...state,
                modal: {
                    open: ' _active',
                    title: action.payload.title,
                    genres: action.payload.genres,
                    description: action.payload.description,
                    date: action.payload.date,
                    budget: action.payload.budget,
                    rating: action.payload.rating,

                },
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                modal: {
                    ...state.modal,
                    open: '',
                }
            }
        default:
            return state;
            
    };
};

export default reducer;
