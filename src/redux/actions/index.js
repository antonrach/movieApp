import movieFetcher from '../../utils/movieFetcher';

let loading = false;

const addMovie = (value = '', searchBy = 'title', sortBy = 'release_date', offset = 0) => {
    if(loading) {
        return (_dispatch) => {
            location.reload() 
        }
    }
    return (_dispatch) => {
        _dispatch(mainDispatcher(value, searchBy, sortBy, offset));
        movieFetcher({value, searchBy, sortBy, offset})
            .then(data => {
                _dispatch({
                    type: 'ADD_MOVIES',
                    payload: {
                        movies: [],
                    }
                });
                _dispatch({
                    type: 'LOADING',
                    payload: {
                        load: false,
                    }
                });
                _dispatch({
                    type: 'NOT_FOUND',
                    payload: {
                        notFound: false,
                    }
                });
                _dispatch({
                    type: 'ERROR',
                    payload: {
                        networkErr: false,
                    },
                });
                if(+data.total === 0) {
                    _dispatch({
                        type: 'NOT_FOUND',
                        payload: {
                            notFound: true,
                        }
                    });
                }
                _dispatch({
                    type: 'ADD_MOVIES',
                    payload: {
                        movies: data.data,
                    }
                })
                _dispatch({
                    type: 'NUMBER',
                    payload: {
                        data: data,
                        hideNum: false,
                    },
                });
                _dispatch({
                    type: 'CHANGE_OFFSET',
                });

                loading = false;
            })
            .catch(() => {
                loading = false;
                _dispatch({
                    type: 'ADD_MOVIES',
                    payload: {
                        movies: [],
                    }
                });
                _dispatch({
                    type: 'LOADING',
                    payload: {
                        load: false,
                    }
                });
                _dispatch({
                    type: 'NOT_FOUND',
                    payload: {
                        notFound: false,
                    }
                });
                _dispatch({
                    type: 'NUMBER',
                    payload: {
                        data: {
                            total: 0,
                        },
                        hideNum: true,
                    }
                });
                _dispatch({
                    type: 'ERROR',
                    payload: {
                        networkErr: true,
                    },
                });
            })
    }
}

const mainDispatcher = (value, searchBy, sortBy, offset) => {
    loading = true;
    if(!offset) {
        offset = 0;
    }
    return (_dispatch) => {
        _dispatch({
            type: 'VALUE',
            payload: {value},
        });
        _dispatch({
            type: 'OFFSET',
            payload: {offset},
        });
        if(sortBy === 'release_date') {
            _dispatch({
                type: 'SORT_BY',
                payload: {
                    sortBy: 'release_date',
                },
            });
        } else if (sortBy === 'vote_average') {
            _dispatch({
                type: 'SORT_BY',
                payload: {
                    sortBy: 'vote_average',
                },
            });
        }
        if(searchBy === 'title') {
            _dispatch({
                type: 'SEARCH_BY',
                payload: {
                    searchBy: 'title',
                },
            });
        } else if (searchBy === 'genres') {
            _dispatch({
                type: 'SEARCH_BY',
                payload: {
                    searchBy: 'genres',
                },
            });
        }
        window.scrollTo(0, 0);
        _dispatch({
            type: 'LOADING',
            payload: {
                load: true,
            }
        });
        _dispatch({type: 'INPUT'});
    }
}

export const searchById = (id) => {
    return (_dispatch) => {
        _dispatch({
            type: 'MODAL_ERROR',
            payload: false,
        });
        
        _dispatch({
            type: 'MODAL_OPEN',
        });
        movieFetcher({type: 'id', id})
            .then(data => {
                _dispatch({
                    type: 'MODAL',
                    payload: data,
                })
            })
            .catch(() => {
                _dispatch({
                    type: 'MODAL_ERROR',
                    payload: true,
                })
            })
    };
        
};

export default addMovie;
