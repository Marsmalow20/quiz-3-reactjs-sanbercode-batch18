import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {DaftarMovieContext} from './DaftarMovieContext';

const DaftarMovieForm = () => {
    const [daftarMovie, setdaftarMovie] = useContext(DaftarMovieContext);
    const [input, setinput] = useState({
        id: null,
        title: '',
        description: '',
        year: '2020',
        duration: '120',
        genre: '',
        rating: '0',
        review: '',
        image_url: ''
    });
    
    useEffect( () => {
        if (daftarMovie.statusForm === 'changeToEdit') {
            let dataMovie = daftarMovie.lists.find (x => x.id === daftarMovie.selectedId)
            setinput({
                title: dataMovie.title,
                description: dataMovie.description,
                year: dataMovie.year,
                duration: dataMovie.duration,
                genre: dataMovie.genre,
                rating: dataMovie.rating,
                image_url: dataMovie.image_url
            })
            setdaftarMovie({...daftarMovie, statusForm: 'edit'})
        }
    }, [daftarMovie, setdaftarMovie]);

    const changeInput = event => {
        let typeOfInput = event.target.name;
        switch(typeOfInput) {
            case 'title': {setinput({...input, title: event.target.value});break}
            case 'description': {setinput({...input, description: event.target.value});break}
            case 'year': {setinput({...input, year: event.target.value});break}
            case 'duration': {setinput({...input, duration: event.target.value});break}
            case 'genre': {setinput({...input, genre: event.target.value});break}
            case 'rating': {setinput({...input, rating: event.target.value});break}
            case 'image_url': {setinput({...input, image_url: event.target.value});break}
            default : {break}
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        
        if (daftarMovie.statusForm === 'create') {
            axios.post('http://backendexample.sanbercloud.com/api/movies', { title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, image_url: input.image_url})
            .then (res=> {
                setdaftarMovie(
                    {
                        statusForm: 'create', selectedId: 0,
                        lists: [...daftarMovie.lists, {
                            id: res.data.id,
                            title: input.title,
                            description: input.description,
                            year: input.year,
                            duration: input.duration,
                            genre: input.genre,
                            rating: input.rating,
                            image_url: input.image_url
                        }]
                    }
                )
            })            
        } else if (daftarMovie.statusForm === 'edit') {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${daftarMovie.selectedId}`, {title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, image_url: input.image_url})
            .then (() => {
                let dataMovie = daftarMovie.lists.find(el => el.id === daftarMovie.selectedId)
                dataMovie.title = input.title
                dataMovie.description = input.description
                dataMovie.year = input.year
                dataMovie.duration = input.duration
                dataMovie.genre = input.genre
                dataMovie.rating = input.rating
                dataMovie.image_url = input.image_url
                setdaftarMovie({statusForm: 'create', selectedId: 0, lists: [...daftarMovie.lists]})
            })
        }
        setinput({id: null, title: '', description: '', year: 2020, duration: 0, genre: '', rating: 0, image_url: ''})
    }

    return (
        <>
            <div style={{backgroundColor: '#FFF', width: '40%', margin: '10px auto', padding: '20px'}}>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td style={{width: '200px'}}>Title</td>
                            <td><input type="text" value={input.title} name="title" onChange={changeInput} style={{padding: '5px', width: '300px'}} required/></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea value={input.description} name="description" onChange={changeInput} style={{padding: '5px', width: '300px'}} required/></td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td><input type="number" value={input.year} name="year" onChange={changeInput} style={{padding: '5px', width: '300px'}} min="1980" required/></td>
                        </tr>
                        <tr>
                            <td>Duration</td>
                            <td><input type="number" value={input.duration} name="duration" onChange={changeInput} style={{padding: '5px', width: '300px'}} min="1" required/></td>
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td><input type="text" value={input.genre} name="genre" onChange={changeInput} style={{padding: '5px', width: '300px'}} required/></td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td><input type="number" value={input.rating} name="rating" onChange={changeInput} style={{padding: '5px', width: '300px'}} min="0" max="10"required/></td>
                        </tr>
                        <tr>
                            <td>Image URL</td>
                            <td><textarea value={input.image_url} name="image_url" onChange={changeInput} style={{padding: '5px', width: '300px'}} required/></td>
                        </tr>
                        <tr>
                        <td colSpan='2'><center><input type="submit" value="Submit" style={{padding: '10px 80px', justifyContent: 'center', border: '0px', borderRadius: '20px', backgroundColor: '#22AAA1', color: '#FFF'}} /></center></td>
                        </tr>
                    </table>
                </form>
            </div>
        </>
    )
}

export default DaftarMovieForm