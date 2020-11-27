const addMovie = (value, searchBy, sortBy) => {
    return (_dispatch) => {
        fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&limit=12`)
            .then(res => res.json())
            .then(data => {
                _dispatch({
                    type: 'CLEAR',
                });
                async function imgLoad() {
                    for (let item of data.data) {
                        function p() {
                            return new Promise(res => {
                                const img = new Image();
                                img.src = item.poster_path;
                                img.onload = (() => {
                                    _dispatch({
                                        type: 'ADD_MOVIE',
                                        payload: item,
                                    })
                                    res();
                                })
                                img.onerror = (() => {
                                    _dispatch({
                                        type: 'ADD_MOVIE_IMG',
                                        payload: item,
                                    })
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
                console.log(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&limit=12`);
            })
    }
}



export default addMovie;
