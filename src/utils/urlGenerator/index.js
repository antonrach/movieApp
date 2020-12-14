const urlGenerator = ({value = '', offset = 0, searchBy = 'title', sortBy = 'release_date'}) => {
    let urlValue;
    let urlSearchBy;
    let urlSortBy;
    let urlOffset;

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

    if(counter === 0) {
        return '/';
    } else {
        return `/?${`${urlValue}${urlOffset}${urlSearchBy}${urlSortBy}`.substr(1)}`;
    }
}

export default urlGenerator;
