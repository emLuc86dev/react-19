// src/hooks/useMovies.ts
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie'; // ajusta esto si tu tipo está en otro lugar

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc'
const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
console.log('ApiBaseUrl:', API_BASE_URL);

export const useMovies = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
   
  return { movieList, isLoading, errorMsg };
};
