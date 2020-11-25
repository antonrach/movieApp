import React from 'react';

const Movie = () => {
    return (
        <div className="movie">
            <div className="movie-cont">
                <div className="tandp">
                    <div
                        className="poster"
                        style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/w500/bi9JddwTwBt3ixGLAiMAF7OXMbV.jpg')`,
                            backgroundSize: 'cover',
                        }}
                    ></div>
                    <div className="movie-title">
                        The Lord of the Rings: The Fellowship of the Ring
                    </div>
                </div>
                <div className="gandy">
                    <div className="genres">
                        <p className="genre">Adventure</p>
                        <p className="genre">Fantasy</p>
                        <p className="genre">Action</p>
                    </div>
                    <div className="year">2001</div>
                </div>
            </div>
        </div>
    )
}

export default Movie;
