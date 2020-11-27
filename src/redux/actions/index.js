let loading = false;

const addMovie = (value, searchBy, sortBy) => {
    if(loading) {
        return (_dispatch) => {
            
        }
    }
    loading = true;
    return (_dispatch) => {
        _dispatch({type: 'LOADING'});
        fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&limit=12`)
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



export default addMovie;
