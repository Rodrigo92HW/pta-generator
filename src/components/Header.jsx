import { NavLink, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`header ${isActive('/Main') ? 'active' : ''}`}>
      <NavLink to="/Main" className="header-link">
        Home
      </NavLink>
      <NavLink to="/PokemonEncounter" className="header-link">
        Pokemon Encounter
      </NavLink>
      <NavLink to="/" className="header-link">
        Pokemon Team
      </NavLink>
      <NavLink to="/Trainer" className="header-link">
        Trainer
      </NavLink>
    </div>
  );
}




export default Header;