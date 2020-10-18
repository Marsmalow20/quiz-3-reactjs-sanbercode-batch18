import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { DaftarMovieContext } from './DaftarMovieContext';
import { Context } from './../utils/Context';

const DaftarMovieList = () => {
    const { logins, history } = useContext(Context);
    const [login] = logins;
    if (!login) {
        history.push("/login");
    }
    const [daftarMovie, setdaftarMovie] = useContext(DaftarMovieContext);
    const [search, setSearch] = useState("");

    useEffect( () => {
        if (daftarMovie.lists === null) {
            axios.get('http://backendexample.sanbercloud.com/api/movies')
            .then(res => {
                setdaftarMovie({
                    ...daftarMovie,
                    lists: res.data.map(el => {
                        return {
                            id: el.id,
                            title: el.title,
                            description: el.description,
                            year: el.year,
                            duration: el.duration,
                            genre: el.genre,
                            rating: el.rating,
                            review: el.review,
                            image_url: el.image_url
                        }
                    })
                })
            })
        }
    }, [setdaftarMovie, daftarMovie]);

    const handleDelete = event => {
        let idDataMovie = parseInt(event.target.value)
        let newLists = daftarMovie.lists.filter(el => el.id ===idDataMovie)
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idDataMovie}`)
        .then (res => {
            console.log(res)
        })
        setdaftarMovie({...daftarMovie, lists: [...newLists]})
    }

    const handleEdit = event => {
        let idDataMovie = parseInt(event.target.value)
        setdaftarMovie({...daftarMovie, selectedId: idDataMovie, statusForm: 'changeToEdit'})
    }

    const changeInput = event => {
        setSearch(event.target.value);
    }

    const handleSearch = () => {
        let list = null;
        if (search !== "") {
            list = daftarMovie.lists.filter(
                (data) =>
                data.title && data.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        setdaftarMovie(list);
    };

    return (
        <>
            <div style={{backgroundColor: '#FFF', width: '30%', margin: '10px auto', padding: '20px'}}>
                <div style={{width: '100%', display: 'flex'}}>
                    <input type="text" name="search" id="search" value={search} onChange={changeInput} style={{width: '75%'}} />
                    <button type="button" onClick={handleSearch} style={{width: '25%', padding: '10px', justifyContent: 'center', border: '0px', borderRadius: '20px', backgroundColor: '#22AAA1', color: '#FFF'}} >
                        Search
                    </button>
                </div>
                
            </div>
            <div style={{backgroundColor: '#FFF', width: '80%', margin: '10px auto', padding: '20px'}}>
                <h1>Daftar Film</h1>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Year</th>
                            <th>Duration</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            daftarMovie.lists !== null && daftarMovie.lists.map((item, index)=>{
                                return(                    
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.year}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.rating}</td>
                                    <td>
                                        <button value={item.id} onClick={handleEdit}>Edit</button>
                                        <button value={item.id} onClick={handleDelete}>Delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <br></br>
            </div>
        </>
    )
}

export default DaftarMovieList