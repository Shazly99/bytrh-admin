import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Icons from '../../constants/Icons';
import './Navber.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Navber() {
  return (
    <> 
      <Navbar className='bg-light '>
        <Container fluid  >
          <Navbar.Collapse  >
            <InputGroup  >
              <button id="basic-addon1"  className='btn__search'>
                <Icons.Search/>
              </button>
              <Form.Control
                placeholder="Search about Products"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className='input__search'
              />
            </InputGroup>
          </Navbar.Collapse>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a className='nav__notification'>
                <Icons.notification size={25} />
              </a>
            </Navbar.Text>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Navber