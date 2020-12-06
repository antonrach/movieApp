import React, { useState, useEffect } from 'react';
import pageCreator from '../../utils/pageCreator';
import { useSelector, useDispatch } from 'react-redux';
import mainDispatcher from '../../redux/actions';
import { Link } from 'react-router-dom';

const Pagination = () => {

    const num = +useSelector((state) => state.total);
    const offset = +useSelector((state) => state.offset);
    const sortBy = useSelector((state) => state.sortBy);
    const searchBy = useSelector((state) => state.searchBy);
    const value = useSelector((state) => state.value);

    const totalPages = Math.ceil(num / 12);

    const [newPages, setNP] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const pages = [];
        pageCreator(pages, totalPages, (offset + 1));
        setNP(pages);
    }, [num, offset]);

    return (
        <div className="pages">
            {newPages.map((item, id) => {
                if(id === 0) {
                    if(item === (offset + 1)) {
                        return (
                                <span
                                    className="page-num _active"
                                    key={id + 1}
                                >
                                    <Link to={`/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                        {item}
                                    </Link>
                                </span>
                        )
                    } else {
                        return (
                            <div key={id + 10} className="pagecont">
                                <span
                                    key={id}
                                    className="page-num un"
                                >
                                    <Link to={`/?value=${value}&offset=0&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                        start
                                    </Link>
                                </span>
                                <span
                                    key={id + 1}
                                    className="page-num first"
                                >
                                    <Link to={`/?value=${value}&offset=${item - 1}&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                        {item}
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                } else if (id === (newPages.length - 1)) {
                    if(item === (offset + 1)) {
                        return (
                                <span
                                    key={id + 1}
                                    className="page-num _active"
                                >
                                    <Link to={`/?value=${value}&offset=${item - 1}&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                        {item}
                                    </Link>
                                </span>
                        )
                    } else {
                        return (
                            <div key={id + 10} className="pagecont">
                                <span
                                    key={id + 1}
                                    className="page-num sec"
                                >
                                    <Link to={`/?value=${value}&offset=${item - 1}&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                        {item}
                                    </Link>
                                </span>
                                <span
                                    key={id + 2}
                                    className="page-num un"
                                >
                                    <Link to={`/?value=${value}&offset=${totalPages - 1}&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                        end
                                    </Link>
                                </span>
                            </div>
                        )
                    }
                } else {
                    if(item === (offset + 1)) {
                        return (
                        <span
                            key={id + 1}
                            className="page-num _active"
                        >
                            <Link to={`/?value=${value}&offset=${item - 1}&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                {item}
                            </Link>
                        </span>
                        )
                    } else {
                        return (
                            <span
                                key={id + 1}
                                className="page-num"
                            >
                                <Link to={`/?value=${value}&offset=${item - 1}&searchBy=${searchBy[2]}&sortBy=${sortBy[2]}`} >
                                    {item}
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