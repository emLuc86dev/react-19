import React, { useState, useEffect } from 'react'

import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import { useMovies } from './services/useMovies';
import MovieList from './components/MovieList';
import Header from './components/Header';




function App() {
 
 const {searchTerm, setSearchTerm, errorMsg, isLoading, movieList} = useMovies()


  return (
    <>
    <main>

     <div className="wrapper">
     <Header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
     </Header>

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
