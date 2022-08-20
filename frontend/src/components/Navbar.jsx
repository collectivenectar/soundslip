import {Link} from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <header>
      <div className="navbar">
        <SignedIn>
          <nav>
            <Link to="/library">Library</Link>
            <ul>
              <li><Link to="/">My Stuff</Link></li>
                <UserButton/>
            </ul>
          </nav>
        </SignedIn>
      </div>
    </header>
  )
}

export default Navbar
