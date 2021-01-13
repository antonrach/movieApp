//require('dotenv').config();
const baseURL = process.env.BASE_URL;
const multiplyOffset = +process.env.MULTIPLY_OFFSET;

const movieFetcher = ({
    type = 'search',
    value = '',
    offset = 0,
    searchBy = 'title',
    sortBy = 'release_date',
    id,
}) => {
    if(type === 'search') {
        return new Promise((res, rej) => {
            fetch(`${baseURL}?sortBy=${sortBy}&sortOrder=desc&search=${value}&searchBy=${searchBy}&offset=${offset * multiplyOffset}&limit=${multiplyOffset}`)
                .then(res => res.json())
                .then(data => {
                    res(data);
                })
                .catch(() => {
                    rej();
                })
        })
    } else if(type === 'id') {
        return new Promise((res, rej) => {
            fetch(`${baseURL}/${id}`)
                .then(res => res.json())
                .then(data => {
                    if(data.id === undefined) {
                        rej();
                    } else {
                        res(data);
                    }
                })
                .catch(() => {
                    rej();
                })
        })
    }
}

export default movieFetcher;
