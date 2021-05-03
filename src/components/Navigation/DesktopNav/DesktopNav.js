import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function DesktopNav({
    photo,
    displayName,
	uid,
    signOut,
	signIn,
    activateChildLink
}) {
    return (
        <React.Fragment>
            {!signIn &&
                <Nav className="hide-on-mobile desktop-links">
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
                </Nav>}
            <Navbar.Collapse className="justify-content-end hide-on-mobile">
                <Nav>
                    <Navbar.Brand href={`/user/${uid}`}>
                        <img
                            src={photo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"/>
                    </Navbar.Brand>
                    {signIn
                        ?   <NavDropdown title={displayName} 
                                id="basic-nav-dropdown hide-on-mobile">
                                <NavDropdown.Item onClick={() => signIn()}>
                                    Log In
                                </NavDropdown.Item>
                            </NavDropdown>
                        :   <NavDropdown title={displayName}  
                                id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={activateChildLink}>
                                    <Link
                                        to={{
                                            pathname: `/contract-drafting-tool/user/${uid}/create`,
                                            state: {
                                                author: displayName
                                            }
                                        }}
                                        className="navbar-link ">Create</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={activateChildLink}>
                                    <Link
                                        to={{
                                            pathname: `/contract-drafting-tool/user/${uid}`,
                                            state: {
                                                author: displayName
                                            }
                                        }}
                                        className="navbar-link ">User</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={() => signOut()}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>}
                </Nav>
            </Navbar.Collapse>
        </React.Fragment>
    )
}

export default DesktopNav