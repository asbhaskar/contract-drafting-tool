import React from 'react';
import './Navigation.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav/MobileNav';
import DesktopNav from './DesktopNav/DesktopNav';
// import Nav from 'react-bootstrap/Nav';
import { useMediaQuery } from 'react-responsive'

const Navigation = ({
    photo,
    displayName,
	uid,
    signOut,
	signIn
}) => {

    const activateChildLink = (event) => {
        if (event.target.firstChild.href) {
            event
                .target
                .firstChild
                .click()
        }
    }

    const isDesktopView = useMediaQuery({
        query: '(min-width: 991px)'
      })

    return (
        <Navbar bg="light" expand="lg" className="navbar-holder">
            <Navbar.Brand>
                <Link to={'/'} className="navbar-link">Contract Drafter</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/> 
                {!isDesktopView && 
                    <MobileNav 
                        photo={photo}
                        displayName={displayName}
                        uid={uid}
                        signOut={signOut}
                        signIn={signIn}/>}
                {isDesktopView && 
                    <DesktopNav 
                        photo={photo}
                        displayName={displayName}
                        uid={uid}
                        signOut={signOut}
                        signIn={signIn}
                        activateChildLink={activateChildLink}/>}
        </Navbar>
    )
}

export default Navigation
