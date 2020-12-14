const pageCreator = (pages, totalPages, currentPage) => {
    if(totalPages > 5) {
        if(currentPage > 3) {
            if((currentPage + 2) <= totalPages) {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = (totalPages - 4); i <= totalPages; i++) {
                    pages.push(i);
                }
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                pages.push(i)
            }
        }
    } else {
        if(totalPages !== 1) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        }
    }
}

export default pageCreator;
