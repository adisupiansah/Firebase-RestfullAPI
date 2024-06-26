import React from 'react'
import { Container, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useAuth } from '../Context/AuthProvider'
import { IoMdLogOut } from "react-icons/io";

const NavigasiBar = () => {
    const { logout, user } = useAuth()

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log('Logout successful');
            }).catch((error) => {
                console.error('Error logging out:', error)
            });
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/app">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title={
                                <span className='align-items-center'>
                                    {user && user.photoURL && (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="rounded-circle me-2"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                    )}
                                    <span className='mt-2'>{user ? (user.displayName || user.email) : 'User'}</span>
                                </span>
                            } id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.3">Setting account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className='text-center'>
                                    Logout <span className="mb-3"><IoMdLogOut className='fs-5' /></span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigasiBar