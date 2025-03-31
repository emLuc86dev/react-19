import { TrendingMovieProps } from "../services/appwrite"

// Aquí estamos asegurándonos de que el tipo de `TrendingCardProps` incluya tanto `movie` como `index`
type TrendingCardProps = {
    movie: Pick<TrendingMovieProps, '$id' | 'poster_url' | 'searchTerm'>; // Esto asegura que `movie` tenga las propiedades correctas
    index: string; // `index` es un número o string que representa la posición
  };
  
const TrendingCard = ({movie, index}: TrendingCardProps) => {
  return (
    <li key={movie.$id} >
              <p>{index +1 }</p>
              <img src={movie.poster_url} alt={movie.searchTerm} />
              
            </li>
  )
}

export default TrendingCard