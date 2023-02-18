import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Navber.scss'
import { Link } from 'react-router-dom';
import { VendersContext } from './../../context/Store';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import routes from './../Sidebar/route';
import { Form, Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle, FaCog, FaPowerOff } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Img from '../../assets/Img';
import { LinkContainer } from 'react-router-bootstrap';
import Icons from '../../constants/Icons';
import { InputGroup } from 'react-bootstrap';

function Navber() {
  let { LogOut } = useContext(VendersContext);

  const [Toggle, setToggle] = useState(false);

  return (
    <>
      <Navbar className='bg-light navSubMain'>
        <Container fluid  >
          <Navbar.Collapse  >
            <div className="app__navbar-menu">

              <HiMenuAlt4 onClick={() => setToggle(!Toggle)} />

              {
                Toggle && (
                  <motion.div whileInView={{ x: [-300, 0] }} transition={{ duration: 1.5, ease: 'backOut' }} >
                    <HiX onClick={() => setToggle(!Toggle)} />
                    <ul >
                      {routes.map((item, index) =>
                      (<li key={index}>
                        <Link to={item.path} onClick={() => setToggle(false)} className='d-flex' >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                      ))}
                    </ul>

                  </motion.div>
                )
              }
            </div>

            {/*<InputGroup>
              <button id="basic-addon1" className='btn__search'>
                <Icons.Search />
              </button>
              <Form.Control
                placeholder="Search about Products"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className='input__search'
              />
            </InputGroup> */}
          </Navbar.Collapse>

          <Navbar.Toggle />

          <Navbar.Collapse className="navEnd justify-content-end">

            <Nav className="chat__icon">
              <NavDropdown title={<Icons.chat size={21} />} id="basic-nav-dropdown"  >
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <LinkContainer to="/chat/clients">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icons.Chatuser color='#313bac' style={{ marginRight: 10 }} />
                        <span>Chat clients </span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/chat/doctors">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icons.ChatDoc color='#313bac' style={{ marginRight: 10 }} />

                        <span>Chat doctors</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                </div>
              </NavDropdown>
              <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>

            </Nav>

            <Nav>
              <NavDropdown title={<img src={Img.avatar1} width="40" height="40" style={{ borderRadius: '10px' }} />} id="basic-nav-dropdown"  >
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>

                  <LinkContainer to="/venderProfile">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Icons.profile} alt="" srcset="" style={{ marginRight: 10 }} width={18} height={18} />
                        {/* <Icons.profile size={20} /> */}
                        <span>My Profile</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>


                  <NavDropdown.Item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icons.settings size={18} style={{ marginRight: 10 }} />
                      <span>Settings & Privacy</span>
                    </div>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <LinkContainer onClick={LogOut} to={'/auth/login'}>
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Icons.logout} alt="" srcset="" style={{ marginRight: 10 }} width={18} height={18} />
                        <span>  Logout  </span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>


                </div>
              </NavDropdown>

            </Nav> 
            
          </Navbar.Collapse>


        </Container>
      </Navbar>
    </>
  )
}

export default Navber