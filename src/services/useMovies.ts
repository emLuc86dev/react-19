// src/hooks/useMovies.ts
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie'; 
import { useDebounce } from './useDebounce';
import { updateSearchCount } from './appwrite';

// Define the base API URL for fetching movies by popularity and the search API URL
const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
const API_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie';

// The API key is loaded from environment variables
const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// Custom hook to handle movie data fetching and state management
export const useMovies = () => {
  // State to hold the search term, movie list, loading state, and any error messages
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Apply debouncing to the search term

  const [movieList, setMovieList] = useState<Movie[]>([]); // Array to hold fetched movie data
  const [isLoading, setIsLoading] = useState(false); // State to indicate if data is being loaded
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // State to hold any error messages

  // Effect hook to fetch data whenever the debounced search term changes
  useEffect(() => {
    // Define an asynchronous function to fetch movie data based on a query
    const fetchData = async (query = '') => {
      try {
        setIsLoading(true); // Set loading to true when starting to fetch data
        setErrorMsg(null); // Reset any previous error messages

        // Build the endpoint URL based on whether there is a search query
        const endpoint = query 
          ? `${API_URL_SEARCH}?query=${encodeURIComponent(query)}` 
          : `${API_BASE_URL}`;
        
        // Make the API request to TMDB
        const response = await fetch(endpoint, {
          method: 'GET', 
          headers: {
            accept: 'application/json', // Set the request headers
            Authorization: `Bearer ${API_KEY}`, // Include the API key in the Authorization header
          },
        });

        // Handle response errors if any
        if (!response.ok) {
          const errorBody = await response.text(); // Get error response text
          console.error('❌ Error fetching movies:', response.status, errorBody); // Log error
          setErrorMsg('Error fetching movies. Please try again later.'); // Set user-friendly error message
          return [];
        }

        // Parse the response data as JSON
        const data = await response.json();
        
        setErrorMsg(null); // Reset any error messages on successful data retrieval
        setMovieList(data.results); // Update the movie list with the fetched results
        
        // If there is a search query and results are found, update the search count in the database
        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }

        return data.results; // Return the list of movies

      } catch (error) {
        // Handle any other errors (e.g., network issues)
        console.error('⚠️ Error in the TMDB API call:', error);
        return [];
      } finally {
        setIsLoading(false); // Set loading to false once the fetch operation is complete
      }
    };

    // Fetch data based on the debounced search term
    fetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // Re-run this effect when the debounced search term changes

  // Return the necessary values from the hook for use in components
  return { searchTerm, setSearchTerm, movieList, isLoading, errorMsg };
};
