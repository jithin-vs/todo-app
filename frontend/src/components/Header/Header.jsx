import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-name">Logo</div>
      <div className="header-fields">
        <Link to ="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
};

export default Header;
