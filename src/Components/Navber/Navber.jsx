import React, { useContext } from 'react';
import { Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { HiMenuAlt4 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import LogoSvg from '../../assets/svg/LogoSvg';
import Icons from '../../constants/Icons';
import { PostData, apiheader } from '../../utils/fetchData';
import { VendersContext } from './../../context/Store';
import './Navber.scss';


function Navber() {
  let { LogOut, isOpen, setIsOpen, isLang, setIsLang } = useContext(VendersContext);
  // const [Toggle, setToggle] = useState(false);
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
            <div className={`app__navbar-menu ${isLang === 'ar' ? 'ms-2 ' : 'me-2'}`}>
              <HiMenuAlt4 onClick={() => setIsOpen(!isOpen)} />
            </div>

            <span className='chang__lang '>

              <DropdownButton
                id={`dropdown-1`}
                title={
                  <>
                    <Icons.Language size={17} /> {isLang === 'ar' ? 'تغييـر اللغـة' : 'Change Lang'}
                  </>
                }
                variant="outline-"
                onSelect={(eventKey) => handleActionSelect(eventKey)}
                className={`DropdownButton`}
                style={{ left: isLang === 'ar' ? '-30px' : '0px' }}
              >
                <Dropdown.Item eventKey="ar"  /* onClick={() => window.location.reload()} */ >عربي</Dropdown.Item>
                <Dropdown.Item eventKey="en"  /* onClick={() => window.location.reload()} */ >English</Dropdown.Item>
              </DropdownButton>

            </span>
          </Navbar.Collapse>

          <Navbar.Toggle />

          <Navbar.Collapse className="navEnd justify-content-end">
            {
              localStorage.getItem('Role') === '1' &&
              <nav className="chat__icon">
                <div className="dropdown" id="basic-nav-dropdown">
                  <div className="btn dropdown-toggle border-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Icons.Chat size={22} />
                  </div>

                  <ul className={`dropdown-menu ${isLang === 'ar' ? 'text-start' : 'text-end'}`} style={{ left: isLang === 'ar' ? '0' : '-100px', zIndex: 99999 }}>
                    <li>
                      <Link to="/chat/clients" className="dropdown-item" >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Icons.Chatuser className={isLang === 'ar' ? 'ms-2' : 'me-2'} />
                          <span>{isLang === 'ar' ? 'محادثات العملاء' : 'Chat clients'} </span>
                        </div>
                      </Link>
                    </li>
                    <NavDropdown.Divider />
                    <li>
                      <Link to="/chat/doctors" className="dropdown-item" >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Icons.ChatDoc className={isLang === 'ar' ? 'ms-2' : 'me-2'} />
                          <span>{isLang === 'ar' ? 'محادثات الأطباء' : 'Chat doctors'}</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            }
            <nav className='d-flex flex-row justify-content-center align-items-center'>
              {/* {localStorage.getItem('Role') === '1'&& */}
              <span className='userName__nav' style={{ margin: '0 10px' }} >
                {localStorage.getItem('UserName')}
              </span>
              {/* // } */}
              <div className="dropdown" id="basic-nav-dropdown2">

                <div className="btn btn__avatar-nav dropdown-toggle border-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem('UserName')?.charAt(0)?.toUpperCase()}
                  {/* <img  src={Img.avatar1} alt='Img avatar1' width="40" height="40" style={{ borderRadius: '10px' }} /> */}
                </div>
                <ul className={`dropdown-menu ${isLang === 'ar' ? 'text-start' : 'text-end'}`} style={{ left: isLang === 'ar' ? '0' : '-130px', zIndex: 99999 }}>
                  <li>
                    <Link to="/profile" className="dropdown-item" >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img  className={isLang === 'ar' ? 'ms-2' : 'me-2'} src={Icons.profile} alt="profile" width={17} height={17} />
                        <span>{isLang === 'ar' ? 'الملـف الشخصـي' : 'My Profile'}</span>
                      </div>
                    </Link>
                  </li>

                  {localStorage.getItem('Role') === '2' ?
                    <>
                      <li>
                        <Link to={`/mcprofile`} className="dropdown-item" >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <LogoSvg.ProfileCenter className={isLang === 'ar' ? 'ms-2' : 'me-2'} style={{ width: 19 }} />

                            <span>{isLang === 'ar' ? 'بيانات المركز الطبي' : 'Center Profile'}</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/docs`} className="dropdown-item" >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <LogoSvg.DocumentUpload className={isLang === 'ar' ? 'ms-2' : 'me-2'} style={{ width: 18 }} />

                            <span>{isLang === 'ar' ? "المستنـدات" : "Documents"}</span>
                          </div>
                        </Link>
                      </li>
                    </>
                    :
                    ''
                  }

                  <NavDropdown.Divider />

                  {localStorage.getItem('Role') === '1' &&
                    <li>
                      <Link to={'/admin/login'} onClick={LogOut} className="dropdown-item" >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img  className={isLang === 'ar' ? 'ms-2' : 'me-2'} src={Icons.logout} alt="logout" width={18} height={18} />
                          <span>
                            {isLang === 'ar' ? 'تسجيـل الخروج' : 'Logout'}
                          </span>
                        </div>
                      </Link>
                    </li>}


                  {localStorage.getItem('Role') === '2' &&
                    <li>
                      <Link to={'/medicalcenter/login'} onClick={LogOut} className="dropdown-item" >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img  className={isLang === 'ar' ? 'ms-2' : 'me-2'} src={Icons.logout} alt="logout" width={18} height={18} />
                          <span>
                            {isLang === 'ar' ? 'تسجيـل الخروج' : 'Logout'}
                          </span>
                        </div>
                      </Link>
                    </li>}
                </ul>
              </div>

            </nav>


            {/* <Nav className="chat__icon">
              <NavDropdown title={<Icons.Chat size={21} />} id="basic-nav-dropdown">
                <div style={{ maxHeight: '60vh', overflowY: 'auto', left: isLang === 'ar' ? '0' : '-130px' }} className={`dropdown-menu ${isLang === 'ar' ? 'text-start' : 'text-end'}`}>
                  <LinkContainer to="/chat/clients">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icons.Chatuser className={isLang === 'ar' ? 'ms-2' : 'me-2'} />
                        <span>{isLang === 'ar' ? 'محادثات العملاء' : 'Chat clients'} </span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/chat/doctors">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icons.ChatDoc className={isLang === 'ar' ? 'ms-2' : 'me-2'} />
                        <span>{isLang === 'ar' ? 'محادثات الأطباء' : 'Chat doctors'}</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                </div>
              </NavDropdown>
              <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
            </Nav> */}

            {/* <Nav>
              <NavDropdown title={<img  src={Img.avatar1} alt='Img avatar1' width="40" height="40" style={{ borderRadius: '10px' }} />} id="basic-nav-dropdown2"  >
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>

                  <LinkContainer to="/profile">
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img  className={isLang === 'ar' ? 'ms-2' : 'me-2'} src={Icons.profile} alt="profile" width={18} height={18} />
                        <span>{isLang === 'ar' ? 'الملـف الشخصـي' : 'My Profile'}</span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <LinkContainer onClick={LogOut} to={'/auth/login'}>
                    <NavDropdown.Item  >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img  className={isLang === 'ar' ? 'ms-2' : 'me-2'} src={Icons.logout} alt="logout" width={18} height={18} />
                        <span>
                          {isLang === 'ar' ? 'تسجيـل الخروج' : 'Logout'}
                        </span>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>


                </div>
              </NavDropdown>
            </Nav> */}

          </Navbar.Collapse>



        </Container>
      </Navbar>
    </>
  )
}

export default Navber