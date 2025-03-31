
type HeaderProps = {
children: React.ReactNode
}

const Header = ({children}:HeaderProps) => {
  return (
    <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
        </h1>
      {children}
      </header>

  )
}

export default Header