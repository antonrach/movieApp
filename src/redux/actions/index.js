const addMovie = (value, searchBy, sortBy) => {
    return (_dispatch) => {
        fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&limit=12`)
            .then(res => res.json())
            .then(data => {
                _dispatch({
                    type: 'CLEAR',
                });
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
                console.log(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&limit=12`);
            })
    }
}

export default addMovie;
