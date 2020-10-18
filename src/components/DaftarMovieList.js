import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import { DaftarMovieContext } from './DaftarMovieContext';

const DaftarMovieList = () => {
    const [daftarMovie, setdaftarMovie] = useContext(DaftarMovieContext);

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

    return (
        <>
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