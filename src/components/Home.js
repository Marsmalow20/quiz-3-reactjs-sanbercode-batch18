import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
    const [dataMovie, setdataMovie] = useState(null);

    useEffect ( () => {
        if (dataMovie === null) {
            axios.get('http://backendexample.sanbercloud.com/api/movies')
            .then(res =>{
                let dataMovie = res.data;
                setdataMovie(
                    dataMovie.map(el => {
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
    }, [dataMovie])
    
    return (
        <div style={{backgroundColor: '#FFF', width: '80%', margin: '10px auto', padding: '20px'}}>
            <h1>Movie List</h1>
                {
                    dataMovie !== null && (
                    dataMovie.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <h2 style={{textAlign: 'left'}}>{item.title}</h2>
                                <div style={{}}>
                                    <img src={item.image_url} alt='...' style={{objectFit: 'cover', height: '400px', width: '60%'}}></img>
                                </div>
                                <div style={{display: "flex", width: '60%', justifyContent: 'space-between', margin: '0 auto'}}>
                                    <p><b>Rating</b> : {item.rating} </p>
                                    <p><b>Durasi</b> : {item.duration} </p>
                                    <p><b>Genre</b> : {item.genre}</p>
                                </div>
                                
                                <p style={{textAlign: 'left', paddingTop: '10px'}}><b>Deskripsi</b> : </p>
                                <p style={{textAlign: 'justify'}}>{item.description}</p>
                                <hr style={{margin: '20px 0'}}></hr>
                            </div>
                        )
                    })
                    )
                }
        </div>
    )
}

export default Home