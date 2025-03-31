import { Movie } from '../types/movie';
const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc'
const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

/**
 * Busca películas usando la API de TMDB.
 * @param query Término de búsqueda
 * @returns Lista de películas
 */
export const fetchMovies = async (): Promise<Movie[] | []> => {

  try {
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
      return [];
    }

    const data = await response.json();
    return data.results as Movie[];
    
  } catch (error) {
    console.error('⚠️ Error en la llamada a TMDB:', error);
    return [];
  }
};

    
     