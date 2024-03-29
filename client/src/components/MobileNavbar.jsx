import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

// Nothing to see here but a navbar. The mobile version.

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  let userName = !isLoaded || !isSignedIn ? null: user.username;

  const [ menuIsOpen, setMenuIsOpen ] = useState(false)

  const toggleMenuOpen = () => {
    setMenuIsOpen(oldState => !oldState)
  }

  const mobileMenu = (
    <div className="mobile-fixed-container">
      <ul className="mobile-menu">
        <li><Link className="mobile-user" to="/">Manage Samples</Link></li>
        <li><Link className="mobile-upload" to="/upload">upload new</Link></li>
        <li><Link className="mobile-library" to="/library">library</Link></li>
      </ul>
    </div>
  )
  
  return (
    <header>
      <div className="navbar-mobile">
        <SignedIn>
          <div className="mobile-menu-container" onClick={ toggleMenuOpen } style={{ color: menuIsOpen && "#c6c5b6" }}>
            <i className="fa-solid fa-bars"></i>
            { menuIsOpen && mobileMenu }
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default Navbar