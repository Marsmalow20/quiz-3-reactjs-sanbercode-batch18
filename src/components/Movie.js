import React from "react"
import MovieList from "./MovieList"
import MovieForm from "./MovieForm"

const Movie = () => {
    return (
        <>
            <DaftarMovieProvider>
                <MovieList/>
                <MovieForm/>
            </DaftarMovieProvider>
        </>
    )
}

export default Movie