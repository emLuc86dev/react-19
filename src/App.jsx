import { useState, useEffect } from 'react'

import './App.css'
import Search from './components/Search'
import { fetchMovies } from './services/tmdb';
import Spinner from './components/Spinner';


// const API_OpTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// }

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc'
const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

/**
 * Busca películas usando la API de TMDB.
 * @param query Término de búsqueda
 * @returns Lista de películas
 */




function App() {
 const [searchTerm, setSearchTerm] = useState('')
 const [errorMsg, setErrorMsg] = useState(null)
 const [movieList, setMovieList] = useState([])
 const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        const response = await fetch(`${API_BASE_URL}`, {
                      method: 'GET', 
                      headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_KEY}`,
                      },
                    });
    
        if (!response.ok) {
          const errorBody = await response.text();
          console.error('❌ Error al obtener películas:', response.status, errorBody);
          setErrorMsg('Error al obtener películas. Inténtalo de nuevo más tarde.');
          return [];
        }
    
        const data = await response.json();
        
        setErrorMsg(null);
        setMovieList(data.results);
        console.log('📽️ Películas obtenidas FOMR aPP:', data.results);
        return data.results ;
        
      } catch (error) {
        console.error('⚠️ Error en la llamada a TMDB:', error);
        return [];
      }finally {
        setIsLoading(false);
      }
    };

    fetchData()
     

  
  }, []);
 


  return (
    <>
    <main>

     <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
        </h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

      <section className="all-movies">
        <h2 className="text-white text-3xl">All Movies</h2>
        {isLoading && <Spinner />}
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        {movieList.length === 0 && !isLoading && !errorMsg && <p className="text-white">No movies found</p>}
        <ul className="movie-list">
          {movieList.map((movie) => (
            <li key={movie.id} className="movie-item">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h3 className="text-white">{movie.title}</h3>
              <p className="text-gray-400">{movie.release_date}</p>
            </li>
          ))}
        </ul>
      </section>
      <h1 className="text-white">{searchTerm}</h1>
     </div>
    </main>
    </>
  )
}

export default App
