
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <span className="header__brand">
          TOP CLUB SOCCER
        </span>

        <h1 className="header__title">
          Dashboard de Jugadores
        </h1>

        <p className="header__description">
          Gestiona tus estrellas favoritas,
          analiza estadísticas y descubre talentos.
        </p>
      </div>
    </header>
  );
}

export default Header;
