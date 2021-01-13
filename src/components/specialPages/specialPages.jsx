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
            <div className={loading ? "loading _active" : "loading"}>
                <div className="loader in-area"></div>
            </div>
            <div className={notFound ? "not-found _active" : "not-found"}>Sorry, cannot find your movie...</div>
            <div className={networkErr ? "not-found error _active" : "not-found error"}>
                Sorry, cannot load this page...
                <p>
                    <Link to={urlGenerator({value, offset, searchBy, sortBy})} >
                        CLICK TO RETRY
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SpecialPages;