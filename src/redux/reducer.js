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
        loading: false,
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
        case 'NUMBER':
            return {
                ...state,
                total: action.payload.data.total,
                hideNum: action.payload.hideNum,
            };
        case 'OFFSET':
            return {
                ...state,
                offset: action.payload.offset,
            };
        case 'SEARCH_BY':
            return {
                ...state,
                searchBy: action.payload.searchBy,
            };
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.payload.sortBy,
            };
        case 'VALUE':
            return {
                ...state,
                value: action.payload.value,
            };
        case 'LOADING':
            return {
                ...state,
                loading: action.payload.load,
            };
        case 'NOT_FOUND':
            return {
                ...state,
                notFound: action.payload.notFound,
            };
        case 'ERROR':
            return {
                ...state,
                networkErr: action.payload.networkErr,
            };
        case 'INPUT':
            return {
                ...state,
                input: !state.input,
            };
        case 'MODAL_OPEN':
            return {
                ...state,
                modal: {
                    ...state.modal,
                    open: true,
                    loading: true,
                },
            };
        case 'MODAL':
            return {
                ...state,
                modal: {
                    ...state.modal,
                    loading: false,
                    title: action.payload.title,
                    genres: action.payload.genres,
                    description: action.payload.overview,
                    date: action.payload.release_date,
                    budget: action.payload.budget,
                    rating: action.payload.vote_average,

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
        case 'MODAL_ERROR':
            return {
                ...state,
                modal: {
                    ...state.modal,
                    error: action.payload,
                    loading: false,
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
