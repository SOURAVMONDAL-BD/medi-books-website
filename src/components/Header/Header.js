
import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaUserCircle, FaGoogle, FaMoon } from "react-icons/fa";
import { AuthContext } from '../../contex/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Tooltip from '../ToolTip/Tootip';





const Header = () => {


    const { user, providerLogin, logOut } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleLogOut = () => {
        logOut()
        .than(() => {})
        .catch(error => console.error(error));
    }

    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .than(result => {
                const user = result.user;
                console.log(user);
                navigate(from, {replace : true});
            })
            .catch(error => console.error(error));
    }


    
    return (

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                    <Navbar.Brand className='d-flex align-items-center' href="#home">
                    <Image src='../../medicine-book.png' className='' style={{ height: '40px' }}></Image>
                    <div className='fw-bold ' style={{ color:'red'}}>Medi Books</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='m-2 text-decoration-none fw-semibold' to='/'>Home</Link>
                        <Link className='m-2 text-decoration-none fw-semibold' to='/course'>Course</Link>
                        <Link className='m-2 text-decoration-none fw-semibold' to='/blog'>Blog</Link>
                        <Link className='m-2 text-decoration-none fw-semibold' to='/faq'>FAQ</Link>
                        
                    </Nav>
                    <Nav>
                        
                        <div className='d-flex align-items-center mx-3'><FaMoon></FaMoon></div>
                        <div className='d-flex align-items-center'>{user?.photoURL ? <Image src={user?.photoURL} className='' roundedCircle style={{ height: '30px' }}></Image> : <FaUserCircle className='fs-3'></FaUserCircle>}</div>
                        <Nav.Link className='fw-bold' href="">{
                                                                    user?.uid ?
                                                                    <>
                                                                        <span className='mx-1'>{user?.displayName}</span>
                                                                        <Button onClick={handleLogOut} className='m-1  p-1 ' variant="outline-info"> Log out</Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Button className='m-1  p-1 ' variant="outline-info"><Link to='/login' className='text-decoration-none text-dark '>LogIn</Link></Button>
                                                                        <Button className='m-1  p-1 ' variant="outline-info"><Link to='/register' className='text-decoration-none text-dark '>Register</Link></Button>
                                                                        <Button onClick={handleGoogleSignIn} className='m-1  p-1 ' variant="outline-info"><Link className='text-decoration-none text-dark '><FaGoogle></FaGoogle> Sign In</Link></Button>

                                                                    </>
                                                                }
                        </Nav.Link>
                                                                

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
};

export default Header;