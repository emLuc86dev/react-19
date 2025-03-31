import { useEffect, useState } from 'react'
import { getTrendingMovies, TrendingMovieProps } from './appwrite'

const useTrendingMovies = () => {
const [trendigMovies, setTrendigMovies] = useState<TrendingMovieProps[] | []>([])
    
const fetchTrendingMovies = async () => {
    try {
        const result = await getTrendingMovies()
        if (result && result.length > 0) {
            setTrendigMovies(result)
            return result
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error)
        
    }
}

useEffect(() => {
    fetchTrendingMovies()
}, [])

  return {trendigMovies}
}

export default useTrendingMovies