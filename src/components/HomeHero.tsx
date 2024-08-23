"use client"

import { useEffect, useState } from "react"
import axios from "axios"

type MovieType = {
  id:string,
  title:string,
  image:string,
  poster_path:string
}

const HomeHero = ()=> {
    const API_URL = "https://api.themoviedb.org/3"
    const API_KEY = "445f8d83ec44d06e98bde843d8da5fc7"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original/"
    const URL_IMAGE= "https://image.tmdb.org/t/p/original/"
  
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    // const [trailer, setMovie] = useState(null)
    // const [movie, setTrailer] = useState({title:"Loading Movies"})
    // const [playing, setPlaying] = useState(null)
  
    const fetchMovies = async(searchKey:string)=> {
      const type = searchKey ? "searchKey" : "discover"
      const {data:{results},} = await axios.get(`${API_URL}/${type}/movie`,{
        params:{
          api_key:API_KEY,
          query:searchKey,
        }
      })
      setMovies(results)
    }
  
    useEffect(()=>{
      fetchMovies(searchKey)
    },[])
  
    console.log(movies,"Movies-->")

    return ( 
        <div className="flex flex-wrap gap-2">
          {movies.map((item:MovieType)=> {
          return(
            <div key={item.id}>
              <img className="h-80" src={`${URL_IMAGE +item.poster_path}`} alt={item.title}/>
              <h1>{item.title}</h1>
            </div>
          )
        })}</div>
    )
}

export default HomeHero