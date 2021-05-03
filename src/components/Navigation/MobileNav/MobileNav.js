import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function MobileNav({
    photo,
    displayName,
	uid,
    signOut,
	signIn
}) {
    return (
        <Navbar.Collapse className="justify-content-end hide-on-desktop">
            <Nav>
                <div className="nav-user-flex">
                    <Navbar.Brand>
                        <img
                            src={photo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"/>
                    </Navbar.Brand>
                    {signIn
                        ?   <Nav.Item>
                                <Nav.Link
                                    className="navbar-link-item" 
                                    onClick={() => signIn()}>Guest</Nav.Link>
                            </Nav.Item>
                        :   <Nav.Item>
                                <Link
                                    to={{
                                        pathname: `/contract-drafting-tool/user/${uid}`,
                                        state: {
                                            author: displayName
                                        }
                                    }}
                                    className="navbar-link navbar-link-item">Abhinav Bhaskar</Link>
                            </Nav.Item>}
                </div>
                {signIn
                    ?   <Nav.Item>
                            <Nav.Link 
                                className="navbar-link-item"
                                onClick={() => signIn()}>Log In</Nav.Link>
                        </Nav.Item>
                    :   <React.Fragment>
                            <Link
                                to={{
                                    pathname: `/contract-drafting-tool/user/${uid}/create`,
                                    state: {
                                        author: displayName
                                    }
                                }}
                                className="navbar-link navbar-link-item">Create Template</Link>
                            <Link
                                to={{
                                    pathname: `/contract-drafting-tool/user/${uid}`,
                                    state: {
                                        author: displayName
                                    }
                                }}
                                className="navbar-link navbar-link-item">User Home</Link>
                            <Nav.Item>
                                <Nav.Link 
                                    className="navbar-link-item"
                                    onClick={() => signOut()}>Log Out</Nav.Link>
                            </Nav.Item>
                        </React.Fragment>}
            </Nav>
        </Navbar.Collapse>
    )
}

export default MobileNav
