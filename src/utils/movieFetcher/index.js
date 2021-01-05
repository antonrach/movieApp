//require('dotenv').config();
const baseURL = process.env.BASE_URL;
const multiplyOffset = +process.env.MULTIPLY_OFFSET;

const movieFetcher = ({
    type = 'search',
    value = '',
    offset = 0,
    searchBy = 'title',
    sortBy = 'release_date',
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
    }
}

export default movieFetcher;
