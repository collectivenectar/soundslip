import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="navbar">
          <nav>
            <Link to="/library">Library</Link>
            <ul>
              <li><Link to="/">Profile</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
      </div>
    </header>
  )
}

export default Navbar
