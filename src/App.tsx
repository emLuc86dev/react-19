import React, { useState, useEffect } from 'react'

import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import { useMovies } from './services/useMovies';
import MovieList from './components/MovieList';
import Header from './components/Header';
import useTrendingMovies from './services/useTrendingMovies';
import TrendingList from './components/TrendingList';
import TrendingCard from './components/TrendingCard';




function App() {
 
 const {searchTerm, setSearchTerm, errorMsg, isLoading, movieList} = useMovies()
 const {trendigMovies} = useTrendingMovies()


  return (
    <>
    <main>

     <div className="wrapper">
     <Header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
     </Header>
      {trendigMovies && trendigMovies.length && 
      <TrendingList>
        
          {trendigMovies.map((movie, index) => (
            <TrendingCard movie={movie} key={movie.$id} index={index}/>
          ))}
       
        
      </TrendingList>}
      <section className="all-movies">
        <h2 className="text-white text-3xl mt-9">All Movies</h2>
        {isLoading && <Spinner />}
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        {movieList.length === 0 && !isLoading && !errorMsg && <p className="text-white">No movies found</p>}
        
        <MovieList movieList={movieList} />
      </section>
     
     </div>
    </main>
    </>
  )
}

export default App
