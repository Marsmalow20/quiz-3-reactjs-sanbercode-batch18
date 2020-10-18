import React from 'react';
import {DaftarMovieProvider } from './DaftarMovieContext';
import DaftarMovieForm from './DaftarMovieForm';
import DaftarMovieList from './DaftarMovieList';
// import SearchBar from './SearchBar';

const DaftarMovie = () => {
    return (
        <>
            <DaftarMovieProvider>
                
                <DaftarMovieList/>
                <DaftarMovieForm/>
            </DaftarMovieProvider>
        </>
    )
}

export default DaftarMovie