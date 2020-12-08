let loading = false;

const addMovie = (value = '', searchBy = 'title', sortBy = 'release_date', offset = 0) => {
    if(loading) {
        return (_dispatch) => {
            location.reload() 
        }
    }
    return (_dispatch) => {
        _dispatch(mainDispatcher(value, searchBy, sortBy, offset));
        fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&offset=${offset * 12}&limit=12`)
            .then(res => res.json())
            .then(data => {
                _dispatch({
                    type: 'CLEAR',
                });
                _dispatch({type: 'LOADED'});
                _dispatch({
                    type: 'FOUND',
                });
                _dispatch({
                    type: 'SUCCESS',
                });
                if(data.data.length === 0 && +data.total !== 0) {
                    location.href = `/?value=${value}&offset=0&searchBy=${searchBy}&sortBy=${sortBy}`;
                    return
                }
                if(+data.total === 0) {
                    _dispatch({
                        type: 'NOT_FOUND'
                    });
                }
                data.data.forEach(item => {
                    _dispatch({
                        type: 'ADD_MOVIE',
                        payload: item,
                    })
                });
                _dispatch({
                    type: 'NUMBER',
                    payload: data,
                });
                if(value !== '') {
                    _dispatch({
                        type: 'RESULTS',
                        payload: {
                            results: value,
                        },
                    })
                } else {
                    _dispatch({
                        type: 'RESULTS_HIDE',
                    })
                }
                loading = false;
            })
            .catch(() => {
                loading = false;
                _dispatch({
                    type: 'CLEAR',
                });
                _dispatch({type: 'LOADED'});
                _dispatch({
                    type: 'FOUND',
                });
                _dispatch({
                    type: 'RESULTS_HIDE',
                });
                _dispatch({
                    type: 'NUMBER_HIDE',
                });
                _dispatch({
                    type: 'ERROR',
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
            _dispatch({type: 'DATE'});
        } else if (sortBy === 'vote_average') {
            _dispatch({type: 'RATING'});
        }
        if(searchBy === 'title') {
            _dispatch({type: 'TITLE'});
        } else if (searchBy === 'genres') {
            _dispatch({type: 'GENRES'});
        }
        window.scrollTo(0, 0);
        _dispatch({type: 'LOADING'});
        _dispatch({type: 'INPUT'});
    }
}



export default addMovie;
