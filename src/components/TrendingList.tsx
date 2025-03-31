type TrendingListProps = {
    children: React.ReactNode
}

const TrendingList = ({children}: TrendingListProps) => {
  return (
    <section className="trending">
    <h2 className="text-white text-3xl mt-9">Trending Movies</h2>
    
    <ul>
     {children}
    </ul>
    
  </section>
  )
}

export default TrendingList