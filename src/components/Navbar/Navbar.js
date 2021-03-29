import React from 'react';
import './Navbar.css';
import BNavbar from 'react-bootstrap/Navbar';
import BNav from 'react-bootstrap/Nav';
import BNavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Navbar = ({
    photo,
    displayName,
	uid,
    auth,
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

    return (
        <BNavbar bg="light" expand="lg" className="navbar-holder">
            <BNavbar.Brand>
                <Link to={'/'} className="navbar-link">Contract Drafter</Link>
            </BNavbar.Brand>
            <BNavbar.Toggle aria-controls="basic-navbar-nav"/> 
				{uid
					? <BNav className="hide-on-mobile">
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
						</BNav>
					: <div></div>
				}
            <BNavbar.Collapse className="justify-content-end">
                <BNav>
                    <BNavbar.Brand href="/user">
                        <img
                            src={photo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"/>
                    </BNavbar.Brand>
                    {signIn
                        ? <BNavDropdown title={displayName} id="basic-nav-dropdown">
                                <BNavDropdown.Item onClick={() => signIn()}>
                                    Log In
                                </BNavDropdown.Item>
                            </BNavDropdown>
                        : <BNavDropdown title={displayName} id="basic-nav-dropdown">
                            <BNavDropdown.Item onClick={activateChildLink}>
                                <Link
                                    to={{
                                    pathname: `/contract-drafting-tool/user/${uid}/create`,
                                    state: {
                                        author: displayName
                                    }
                                }}
                                    className="navbar-link ">Create</Link>
                            </BNavDropdown.Item>
                            <BNavDropdown.Item onClick={activateChildLink}>
                                <Link
                                    to={{
                                    pathname: `/contract-drafting-tool/user/${uid}`,
                                    state: {
                                        author: displayName
                                    }
                                }}
                                    className="navbar-link ">User</Link>
                            </BNavDropdown.Item>
                            <BNavDropdown.Divider/>
                            <BNavDropdown.Item onClick={() => auth.signOut()}>
                                Log Out
                            </BNavDropdown.Item>
                        </BNavDropdown>
					}
                </BNav>
            </BNavbar.Collapse>
        </BNavbar>
    )
}

export default Navbar
