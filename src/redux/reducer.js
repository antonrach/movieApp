const initialState = {
    data: [],
    total: 0,
    offset: 0,
    hideNum: true,
    searchBy: 'title',
    sortBy: 'release_date',
    value: '',
    loading: false,
    notFound: false,
    networkErr: false,
    input: false,
    changeOffset: false,
    modal: {
        open: false,
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
        case 'ADD_MOVIES': 
            return {
                ...state,
                data: action.payload.movies,
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
                hideNum: false,
            };
        case 'OFFSET':
            return {
                ...state,
                offset: action.payload.offset,
            };
        case 'NUMBER_HIDE':
            return {
                ...state,
                hideNum: true,
                total: 0,
            };
        case 'TITLE':
            return {
                ...state,
                searchBy: 'title',
            };
        case 'GENRES':
            return {
                ...state,
                searchBy: 'genres',
            };
        case 'RATING':
            return {
                ...state,
                sortBy: 'vote_average',
            };
        case 'DATE':
            return {
                ...state,
                sortBy: 'release_date',
            };
        case 'VALUE':
            return {
                ...state,
                value: action.payload.value,
            };
        case 'LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'LOADED':
            return {
                ...state,
                loading: false,
            };
        case 'NOT_FOUND':
            return {
                ...state,
                notFound: true,
            };
        case 'FOUND':
            return {
                ...state,
                notFound: false,
            };
        case 'ERROR':
            return {
                ...state,
                networkErr: true,
            };
        case 'SUCCESS':
            return {
                ...state,
                networkErr: false,
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
                    open: true,
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
                    open: false,
                }
            };
        case 'CHANGE_OFFSET':
            return {
                ...state,
                changeOffset: !state.changeOffset,
            };
        default:
            return state;
            
    };
};

export default reducer;
