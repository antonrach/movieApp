import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import urlGenerator from '../../utils/urlGenerator';

Modal.setAppElement('.area');

const Details = () => {

    const classModal = useSelector((state) => state.modal.open);
    const modalProps = useSelector((state) => state.modal);
    const sortBy = useSelector((state) => state.sortBy);
    const value = useSelector((state) => state.value);
    const searchBy = useSelector((state) => state.searchBy);
    const offset = +useSelector((state) => state.offset);
    const loading = useSelector((state) => state.modal.loading);
    const error = useSelector((state) => state.modal.error);
    const shouldSearch = useSelector((state) => state.modal.shouldSearch);

    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Modal
            closeTimeoutMS={500}
            isOpen={classModal}
            overlayClassName='modal-overlay'
            className={loading ? 'modal-content loading-wind' : 'modal-content'}
            onAfterClose={() => {
                if(shouldSearch) {
                    history.push(urlGenerator({ value, searchBy, sortBy, offset }));
                }
            }}
            //className={'modal-content loading-wind'}
        >
            <button
                className="close-btn"
                onClick={() => {
                    dispatch({
                        type: 'CLOSE_MODAL',
                        payload: true, 
                    });
                }}
            >
                <p>&#215;</p>
            </button>
            <div className="loadercont">
                <div className="loader"></div>
            </div>
            <div className={error ? "errorcontwind _active" : "errorcontwind"}>
                <div className="errorwind">Error!</div>
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
                                payload: false, 
                            });
                        }}
                    >
                        <Link to={urlGenerator({value: item, searchBy: 'genres', sortBy})} >
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
        </Modal>
    )
}

export default Details;
