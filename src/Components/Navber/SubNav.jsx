import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Icons from '../../constants/Icons';

const SubNav = ({ sub__nav }) => {


    return (
        <>
            <Navbar className='shadow-none subNav'>
                <Nav className="me-auto">
                    {
                        sub__nav.map((nav, index) => (
                            <React.Fragment key={index} >
                                <LinkContainer to={nav.path} >
                                    <Nav.Link eventKey={index} className='nav-link '  >{nav.name}</Nav.Link>
                                </LinkContainer>
                                {
                                    index < 1 &&
                                    <span className=' d-flex justify-content-center align-items-center'> <Icons.arrow size={20} /> </span>
                                }
                            </React.Fragment>
                        ))
                    }
                </Nav>
            </Navbar>
        </>
    )
}

export default SubNav
