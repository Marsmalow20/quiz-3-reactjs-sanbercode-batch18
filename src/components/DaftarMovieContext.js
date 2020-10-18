import React, { useState, createContext } from 'react';

export const DaftarMovieContext = createContext();

export const DaftarMovieProvider = props => {
    const [daftarMovie, setdafftarMovie] = useState({
        lists: null,
        selectedId: 0,
        statusForm: 'create'
    });

    return (
        <DaftarMovieContext.Provider value={[daftarMovie, setdafftarMovie]}>
            {props.children}
        </DaftarMovieContext.Provider>
    );
};
