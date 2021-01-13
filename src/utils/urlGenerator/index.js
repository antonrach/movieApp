const urlGenerator = ({value = '', offset = 0, searchBy = 'title', sortBy = 'release_date', id}) => {
    let urlValue;
    let urlSearchBy;
    let urlSortBy;
    let urlOffset;
    let urlId

    let counter = 0;

    if(value === '') {
        urlValue = '';
    } else {
        urlValue = `&value=${value}`;
        counter++;
    }
    if(offset === 0) {
        urlOffset = '';
    } else {
        urlOffset = `&offset=${offset}`;
        counter++;
    }
    if(searchBy === 'title') {
        urlSearchBy = ''
    } else {
        urlSearchBy = `&searchBy=${searchBy}`;
        counter++;
    }
    if(sortBy === 'release_date') {
        urlSortBy = '';
    } else {
        urlSortBy = `&sortBy=${sortBy}`;
        counter++;
    }
    if(id === undefined) {
        urlId = '';
    } else {
        urlId = `&id=${id}`;
        counter++;
    }

    if(counter === 0) {
        return '/';
    } else {
        return `/?${`${urlValue}${urlOffset}${urlSearchBy}${urlSortBy}${urlId}`.substr(1)}`;
    }
}

export default urlGenerator;
