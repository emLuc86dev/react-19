import React, { useState, useEffect } from 'react'

import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useMovies } from './services/useMovies';
import MovieList from './components/MovieList';



function App() {
 
 const {searchTerm, setSearchTerm, errorMsg, isLoading, movieList} = useMovies()


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
        
        <MovieList movieList={movieList} />
      </section>
     
     </div>
    </main>
    </>
  )
}

export default App
