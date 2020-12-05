let loading = false;

export const addMovie = (value, searchBy, sortBy, offset) => {
    if(loading) {
        return (_dispatch) => {
            location.reload() 
        }
    }
    return (_dispatch) => {
        _dispatch(mainDispatcher(value, searchBy, sortBy, offset));
        
        _dispatch({type: 'LOADING'});
        _dispatch({type: 'INPUT'});
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
                if(+data.total === 0) {
                    loading = false;
                    _dispatch({
                        type: 'NOT_FOUND'
                    });
                }
                async function imgLoad() {
                    for (let [id, item] of data.data.entries()) {
                        function p() {
                            return new Promise(res => {
                                const img = new Image();
                                img.src = item.poster_path;
                                img.onload = (() => {
                                    _dispatch({
                                        type: 'ADD_MOVIE',
                                        payload: item,
                                    })
                                    if(id === (data.data.length - 1)) {
                                        loading = false;
                                    }
                                    res();
                                })
                                img.onerror = (() => {
                                    _dispatch({
                                        type: 'ADD_MOVIE_IMG',
                                        payload: item,
                                    })
                                    if(id === (data.data.length - 1)) {
                                        loading = false;
                                    }
                                    res();
                                })
                            })
                        }
                        await p();

                    }
                }
                imgLoad();
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
    /*if(loading) {
        return (_dispatch) => {
            
        }
    }*/
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
    }
}



export default mainDispatcher;
