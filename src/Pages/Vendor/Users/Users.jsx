import React, { useEffect, useState } from 'react'
import Component from '../../../constants/Component'
import './Users.scss'
import Icons from "../../../constants/Icons.js";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { GetData, PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';

function Users() {
  const [page, setPage] = useState(1);
  const [usersList, setuserList] = useState(null);
  const [PagesNumber, setPagesNumber] = useState('')

  const handleChange = (event, value) => {
    setPage(value);
  };
  const test = () => {

  }

  const userList = async (page) => {
    try {
      let { data } = await PostData(`https://bytrh.com/api/admin/users`, { IDPage: page }, apiheader);
      setuserList(data.Response.Users);
      setPagesNumber(data.Response.Pages);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          userList(page);
        }, (retryAfter || 1) * 1000);
      }
    }
  }
  useEffect(() => {
    userList(page)
  }, [page, PagesNumber])
  // to fixed problem because Pagination count need a number 
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;


  const [searchValue, setSearchValue] = React.useState('');
  const handleSearchClick = () => {
    console.log(searchValue);
    searchGetData(searchValue)
  };
  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/users`, { SearchKey: searchValue }, apiheader)
    console.log(data);
    setuserList(data.Response.Users)
  }
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      userList(page)
    }
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/users`, { UserStatus: selectedValue }, apiheader)
      setuserList(data.Response.Users)
    } else if (selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/users`, { UserStatus: selectedValue }, apiheader)
      setuserList(data.Response.Users)
    } else if (selectedValue === "PENDING") {
      let { data } = await PostData(`https://bytrh.com/api/admin/users`, { UserStatus: selectedValue }, apiheader)
      setuserList(data.Response.Users)
    } else if (selectedValue === "All") {
      userList()
    }
  };
  return (
    <>
      {
        usersList ?
          <>
            <div className="app__Users ">
              <Component.ButtonBase onclick={test} title={"Add  "} bg={"primary"} icon={<Icons.add />} path="/user/addUser" />
              <div className="app__Users-table">
                <div className="search-container">

                  <div className='search__group'>
                    <input type="text" placeholder="Search by name or email or phone....." name="search" value={searchValue} onChange={handleInputChange} />
                    <button type="submit" onClick={handleSearchClick}>
                      <Icons.Search color='#fff' size={25} />
                    </button>
                  </div>

                  <div className='filter__group'>
                    <label>
                      {
                        selectedOption === "All" ?
                          <input
                            type="radio"
                            name="filter"
                            value="All"
                            checked 
                            onChange={handleOptionChange}
                            className={`inactive-radio form-check-input `}
                          /> :
                          <input
                            type="radio"
                            name="filter"
                            value="All"
                            checked ={selectedOption === "All"}
                            onChange={handleOptionChange}
                            className={`inactive-radio form-check-input `} 
                          />
                      }

                      All
                    </label>

                    <label className='active'>
                      <input
                        type="radio"
                        name="filter"
                        value="ACTIVE"
                        checked={selectedOption === "ACTIVE"}
                        onChange={handleOptionChange}
                        className="active-radio form-check-input"

                      />
                      Active
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="filter"
                        value="INACTIVE"
                        checked={selectedOption === "INACTIVE"}
                        onChange={handleOptionChange}
                        className="inactive-radio form-check-input"

                      />
                      InActive
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="filter"
                        value="PENDING"
                        checked={selectedOption === "PENDING"}
                        onChange={handleOptionChange}
                        className="inactive-radio form-check-input"

                      /> 
                      Pending
                    </label>

                  </div>

                </div>
                <Component.UsersTable usersList={usersList} userList={userList} />
              </div>

            </div>
            <div className="pagination ">
              <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                <Pagination count={pageCount} page={page} onChange={handleChange} />
              </Box>
            </div>
          </> : <Component.Loader />
      }
    </>
  )
}

export default Users
