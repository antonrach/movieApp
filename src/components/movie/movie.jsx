import React from 'react';

const Movie = (props) => {
    return (
        <div className="movie">
            <div className="movie-cont">
                <div className="tandp">
                    <div
                        className="poster"
                        style={{
                            backgroundImage: `url(${props.moviePoster})`,
                            backgroundSize: 'cover',
                        }}
                    ></div>
                    <div className="movie-title">
                        {props.movieTittle}
                    </div>
                </div>
                <div className="gandy">
                    <div className="genres">
                        {props.movieGenres.map((item, id) => (
                            <p
                                className="genre"
                                key={id}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="year">
                        {props.movieYear}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie;
