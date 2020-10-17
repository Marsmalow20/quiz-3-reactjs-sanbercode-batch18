import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MovieList = () => {
    const [daftarMovie, setdaftarMovie] = useState(null);
    const [input, setinput] = useState({
        id: null,
        title: '',
        description: '',
        year: '2020',
        duration: '0',
        genre: '',
        rating: '0',
        review: '',
        image_url: ''
    });

    useEffect( () => {
        if (daftarMovie === null) {
            axios.get('http://backendexample.sanbercloud.com/api/movies')
            .then(res => {
                let daftarMovie = res.data
                setdaftarMovie(
                    daftarMovie.map(el => {
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
                )
            })
        }
    }, [setdaftarMovie, daftarMovie]);

    const handleSubmit = (event) => {
        event.preventDefault()
        if ( input.id === null) {
            axios.post('http://backendexample.sanbercloud.com/api/movies', { title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, image_url: input.image_url})
            .then(res => {
                var data = res.data
                setdaftarMovie([...daftarMovie, {title: data.title, description: data.description, year: data.year, duration: data.duration, genre: data.genre, rating: data.rating, image_url: data.image_url}])
                setinput({id: null, title: '', description: '', year: 2020, duration: 0, genre: '', rating: 0, image_url: ''})
            })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, {title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, image_url: input.image_url})
            .then(res => {
                var dataMovie = daftarMovie.map(x => {
                    if (x.id === input.id){
                    x.title = input.title
                    x.description = input.description
                    x.year = input.year
                    x.duration = input.duration
                    x.genre = input.genre
                    x.rating = input.rating
                    x.image_url = input.image_url
                    }
                    return x
                })
                setdaftarMovie(dataMovie)
                setinput({id: null, title: '', description: '', year: 2020, duration: 0, genre: '', rating: 0, image_url: ''})
            })
        }
    }

    const handleDelete = (event) =>{
        var idMovie= parseInt(event.target.value) 
        console.log(daftarMovie)
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idMovie}`)
        .then(res => {
            var dataMovie = daftarMovie.filter(x=> x.id !== idMovie)
            setdaftarMovie(dataMovie)
        })
    }

    const handleEdit = (event) =>{
        let idMovie = parseInt(event.target.value);
        let movie = daftarMovie.find((x)=> x.id === idMovie)
        console.log(movie)
    
        setinput({
            title: movie.title,
            description: movie.description,
            year: movie.year,
            duration: movie.duration,
            genre: movie.genre,
            rating: movie.rating,
            image_url: movie.image_url
        });
    }

    const changeInput = (event) => {
        let value = event.target.value;
        let type = event.target.name;

        switch(type) {
            case 'title': {setinput({...input, title: value});break}
            case 'description': {setinput({...input, description: value});break}
            case 'year': {setinput({...input, year: value});break}
            case 'duration': {setinput({...input, duration: value});break}
            case 'genre': {setinput({...input, genre: value});break}
            case 'rating': {setinput({...input, rating: value});break}
            case 'image_url': {setinput({...input, image_url: value});break}
            default : break
        }
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
                            daftarMovie !== null && daftarMovie.map((item, index)=>{
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
            <div style={{backgroundColor: '#FFF', width: '40%', margin: '10px auto', padding: '20px'}}>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td style={{width: '200px'}}>Title</td>
                            <td><input type="text" value={input.title} name="title" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea value={input.description} name="description" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td><input type="number" value={input.year} name="year" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                        <tr>
                            <td>Duration</td>
                            <td><input type="number" value={input.duration} name="duration" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td><input type="text" value={input.genre} name="genre" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td><input type="number" value={input.rating} name="rating" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                        <tr>
                            <td>Image URL</td>
                            <td><textarea value={input.image_url} name="image_url" onChange={changeInput} style={{padding: '5px', width: '300px'}} /></td>
                        </tr>
                    </table>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default MovieList