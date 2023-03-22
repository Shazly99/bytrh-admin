import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { Dropdown, DropdownButton, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Img from '../../assets/Img';
import Icons from '../../constants/Icons';
import { apiheader, PostData } from '../../utils/fetchData';
import { VendersContext } from './../../context/Store';
import routes from './../Sidebar/route';
import './Navber.scss';

function Navber() {
  let { LogOut, isLang, setIsLang } = useContext(VendersContext);
  const [Toggle, setToggle] = useState(false);
  // const showAnimation = {
  //   hidden: {
  //     width: 0,
  //     opacity: 0,
  //     transition: { duration: 0.4, when: "afterChildren" },
  //   },
  //   show: {
  //     opacity: 1,
  //     width: "auto",
  //     transition: {
  //       duration: 0.3,
  //       when: "beforeChildren",
  //     },
  //   },
  // };
  const handleActionSelect = async (action) => {
    if (action === 'en') {
      setIsLang('en')
      return await PostData(`https://bytrh.com/api/admin/users/language/change`, { UserLanguage: action }, apiheader)
    } else if (action === 'ar') {
      setIsLang('ar')
      return await PostData(`https://bytrh.com/api/admin/users/language/change`, { UserLanguage: action }, apiheader)
    }
  }


  return (
    <>
      <Navbar className='bg-light navSubMain'>
        <Container fluid  >
          <Navbar.Collapse  >
            <div className="app__navbar-menu">

              <HiMenuAlt4 onClick={() => setToggle(!Toggle)} />

              {
                Toggle && (
                  <motion.div className='sidebarSm' whileInView={{ x: [-300, 0] }} transition={{ duration: 1.5, ease: 'backOut' }} >
                    <HiX onClick={() => setToggle(!Toggle)} />
                    <ul >
                      {
                        routes.map((item, index) => {


                          // if (item.subRoutes) {
                          //   return (
                          //     <SidebarMenu
                          //       key={index}
                          //       setIsOpen={setIsOpen}
                          //       route={item}
                          //       // showAnimation={showAnimation}
                          //       isOpen={isOpen}
                          //       open={isOpen}
                          //     />
                          //   );
                          // }
                          return (
                            <li key={index}>
                              <Link to={item.path} onClick={() => setToggle(false)} className='d-flex' >
                                {item.icon}
                                {item.name}
                              </Link>
                            </li>
                          )
                        })
                      }


                    </ul>

                  </motion.div>
                )
              }
            </div>

            <span className='chang__lang '>
              <DropdownButton
                id={`dropdown-1`}
                title={
                  <>
                    <Icons.Language size={17} /> Change Lang
                  </>
                }
                variant="outline-"
                onSelect={(eventKey) => handleActionSelect(eventKey)}
                className="DropdownButton "
              >
                <Dropdown.Item eventKey="ar"  >عربي</Dropdown.Item>
                <Dropdown.Item eventKey="en" >English</Dropdown.Item>
               {/*  onClick={() => window.location.reload()}
onClick={() => window.location.reload()} */}
              </DropdownButton>
            </span>
          </Navbar.Collapse>

          <Navbar.Toggle />

          <Navbar.Collapse className="navEnd justify-content-end">

            <Nav className="chat__icon">
              <NavDropdown title={<Icons.Chat size={21} />} id="basic-nav-dropdown"  >
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <LinkContainer to="/chat/clients">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icons.Chatuser style={{ marginRight: 10 }} />
                        <span>Chat clients </span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/chat/doctors">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icons.ChatDoc style={{ marginRight: 10 }} />

                        <span>Chat doctors</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                </div>
              </NavDropdown>
              <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>

            </Nav>

            <Nav>
              <NavDropdown title={<img loading="lazy" src={Img.avatar1} alt='Img avatar1' width="40" height="40" style={{ borderRadius: '10px' }} />} id="basic-nav-dropdown"  >
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>

                  <LinkContainer to="/venderProfile">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img loading="lazy" src={Icons.profile} alt="" srcset="" style={{ marginRight: 10 }} width={18} height={18} />
                        {/* <Icons.profile size={20} /> */}
                        <span>My Profile</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <LinkContainer onClick={LogOut} to={'/auth/login'}>
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img loading="lazy" src={Icons.logout} alt="" srcset="" style={{ marginRight: 10 }} width={18} height={18} />
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