import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';

const SpecialPages = () => {

    const loading = useSelector((state) => state.loading);
    const notFound = useSelector((state) => state.notFound);
    const networkErr = useSelector((state) => state.networkErr);
    const offset = useSelector((state) => state.offset);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);
    const value = useSelector((state) => state.value);

    return (
        <div>
            <div className={"loading" + loading}>
                <p>Loading...</p>
            </div>
            <div className={"not-found" + notFound}>Sorry, cannot find your movie...</div>
            <div className={"not-found error" + networkErr}>
                Sorry, cannot load this page.
                Please, check your Internet connection.
                <p>
                    <Link to={urlGenerator(value, offset, searchBy[2], sortBy[2])} >
                        CLICK TO RETRY
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SpecialPages;