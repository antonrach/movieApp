import React, { useState, useEffect } from 'react';
import pageCreator from '../../utils/pageCreator';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import urlGenerator from '../../utils/urlGenerator';

//require('dotenv').config();
const multiplyOffset = +process.env.MULTIPLY_OFFSET;

const Pagination = () => {

    const num = +useSelector((state) => state.total);
    const offset = +useSelector((state) => state.offset);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);
    const value = useSelector((state) => state.value);

    const totalPages = Math.ceil(num / multiplyOffset);

    const [newPages, setNP] = useState([]);

    useEffect(() => {
        const pages = [];
        pageCreator(pages, totalPages, (offset + 1));
        setNP(pages);
    }, [num, offset]);

    return (
        <div className="pages">
            {newPages.map((item) => {
                if(item.id === 0) {
                    if(item.num === (offset + 1)) {
                        return (
                                <span
                                    className="page-num _active"
                                    key={item.id + 1}
                                >
                                    <Link to={urlGenerator({value, searchBy, sortBy})} >
                                        {item.num}
                                    </Link>
                                </span>
                        )
                    } else {
                        return (
                            <div key={item.id + 10} className="pagecont">
                                <span
                                    key={item.id}
                                    className="page-num un"
                                >
                                    <Link to={urlGenerator({value, searchBy, sortBy})} >
                                        start
                                    </Link>
                                </span>
                                <span
                                    key={item.id + 1}
                                    className="page-num first"
                                >
                                    <Link to={urlGenerator({value, offset: (item.num - 1), searchBy, sortBy})} >
                                        {item.num}
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                } else if (item.id === (newPages.length - 1)) {
                    if(item.num === (offset + 1)) {
                        return (
                                <span
                                    key={item.id + 1}
                                    className="page-num _active"
                                >
                                    <Link to={urlGenerator({value, offset: (item.num - 1), searchBy, sortBy})} >
                                        {item.num}
                                    </Link>
                                </span>
                        )
                    } else {
                        return (
                            <div key={item.id + 10} className="pagecont">
                                <span
                                    key={item.id + 1}
                                    className="page-num sec"
                                >
                                    <Link to={urlGenerator({value, offset: (item.num - 1), searchBy, sortBy})} >
                                        {item.num}
                                    </Link>
                                </span>
                                <span
                                    key={item.id + 2}
                                    className="page-num un"
                                >
                                    <Link to={urlGenerator({value, offset: (totalPages - 1), searchBy, sortBy})} >
                                        end
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                } else {
                    if(item.num === (offset + 1)) {
                        return (
                        <span
                            key={item.id + 1}
                            className="page-num _active"
                        >
                            <Link to={urlGenerator({value, offset: (item.num - 1), searchBy, sortBy})} >
                                {item.num}
                            </Link>
                        </span>
                        )
                    } else {
                        return (
                            <span
                                key={item.id + 1}
                                className="page-num"
                            >
                                <Link to={urlGenerator({value, offset: (item.num - 1), searchBy, sortBy})} >
                                    {item.num}
                                </Link>
                            </span> 
                        )
                    }
                }        
            })}
        </div>
    )
}

export default Pagination;