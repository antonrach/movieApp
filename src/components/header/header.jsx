import React, { useState, useEffect } from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="darkheader">
                <div className="container">
                    <p className="exclamation">Find any movie here!</p>
                    <form
                        className="search-movie"
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                            }
                        }
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                        />
                        <button
                            type="submit"
                        >
                            Go
                        </button>
                    </form>
                    <div className="search-settings">
                        <div className="search-by">Search by:</div>
                        <button
                            type="button"
                            className=""
                        >
                            title
                        </button>
                        <button
                            type="button"
                            className=""
                        >
                            genre
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
