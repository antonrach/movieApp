import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Details = () => {

    const classModal = useSelector((state) => state.modal.open);
    const modalProps = useSelector((state) => state.modal);
    const sortBy = useSelector((state) => state.sortBy);

    const dispatch = useDispatch();

    return (
        <div className={"amodal" + classModal}>
            <div className="details">
                <div className="detcont">
                    <div className="modal-window">
                        <div
                            className="close-btn"
                            onClick={() => {
                                dispatch({
                                   type: 'CLOSE_MODAL', 
                                });
                            }}
                        >
                            <p>&#215;</p>
                        </div>
                        <h2>{modalProps.title}</h2>
                        <div className="genres-modal">
                            {modalProps.genres.map((item, id) => (
                                <span
                                    className="genre-modal"
                                    key={id}
                                    onClick={() => {
                                        dispatch({
                                           type: 'CLOSE_MODAL', 
                                        });
                                    }}
                                >
                                    <Link to={`/?value=${item}&offset=0&searchBy=genres&sortBy=${sortBy[2]}`} >
                                        {item}
                                    </Link>
                                </span>
                            ))}
                        </div>
                        <p className="description">{modalProps.description}</p>
                        <p className="release-date">Release date: <span>{modalProps.date}</span></p>
                        <p className="release-date">Budget: <span>{(+modalProps.budget === 0) ? 'UNKNOWN' : `$ ${modalProps.budget.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`}</span></p>
                        {(+modalProps.rating === 0) ? <p className="release-date rating unknown">
                            Rating: <span>UNKNOWN</span>
                        </p> :
                        <p className="release-date rating">
                            Rating: <span>{modalProps.rating}</span>
                        </p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;
