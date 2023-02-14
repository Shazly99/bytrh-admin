import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Navber.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Icons from '../../constants/Icons';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { VendersContext } from './../../context/Store';

const settings = ['Profile', 'Logout'];
function Navber() {
  let { LogOut } = useContext(VendersContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <>
      <Navbar className='bg-light '>
        <Container fluid  >
          <Navbar.Collapse  >
            <InputGroup  >
              <button id="basic-addon1" className='btn__search'>
                <Icons.Search />
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

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Icons.profile size={25} color={"#1B578D"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to={'/venderProfile'}>
                      Profile
                    </Link>
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link onClick={LogOut} to={'/auth/login'}>
                      Logout
                    </Link>
                  </Typography>
                </MenuItem>

              </Menu>
            </Box>
            {/* <Navbar.Text>
              <a className='nav__notification'>
                <Icons.notification size={25} />
              </a>
            </Navbar.Text> */}
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Navber