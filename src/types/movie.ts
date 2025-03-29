/**
 * Tipos para la información de películas desde TMDB
 */
export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    video: boolean;
  }
  
  