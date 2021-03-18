import axios from './axios'
import React, { useState, useEffect } from 'react'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
    
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(fetchUrl);
            setMovies(result.data.results);
            return result;
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay:1,
        },
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        }
        else {
            movieTrailer(movie?.name || "")
                .then(url=>{
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"))
                })
                .catch(error => {
                console.log(error)
            })
        }
    }
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                { movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                        src={`${baseURL}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                        alt={movie.name}
                    />
                 ))} 

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* <YouTube videoId='XtMThy8QKqU' opts={opts} /> */}
        </div>
    )
}

export default Row
