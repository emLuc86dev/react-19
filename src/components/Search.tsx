import React from 'react'

type SearchProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const Search = ({searchTerm, setSearchTerm}: SearchProps) => {
  return (
    <div className='search'>
        <div>
            <img src="search.svg" alt="search" />
            <input type="text" 
            placeholder='Search for a product'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search