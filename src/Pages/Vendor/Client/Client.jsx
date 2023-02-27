import React, { useEffect, useState } from 'react'
import Component from '../../../constants/Component'
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';
import Icons from "../../../constants/Icons.js";

const Clients = () => {
  const [page, setPage] = React.useState(1);
  const [usersList, setuserList] = React.useState(null);
  const [PagesNumber, setPagesNumber] = React.useState('')

  const handleChange = (event, value) => {
    setPage(value);
  };

  const userList = async (page) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page }, apiheader)
    setuserList(data.Response.Clients)
    setPagesNumber(data.Response.Pages);
  }
  useEffect(() => {
    userList(page)
  }, [page, PagesNumber])

  // to fixed problem because Pagination count need a number 
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;


  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = () => {
    // console.log(searchValue);
    searchGetData(searchValue)
  };
  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { SearchKey: searchValue }, apiheader)
    /*    console.log(data); */
    setuserList(data.Response.Clients)
  }
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      userList(page)
    }
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
    // filter
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = async (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      // filter your content based on the selected option 
      if (selectedValue === "ACTIVE") {
        let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { ClientStatus: selectedValue }, apiheader)
        setuserList(data.Response.Clients)
      } else if (selectedValue === "INACTIVE") {
        let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { ClientStatus: selectedValue }, apiheader)
        setuserList(data.Response.Clients)
      } else if (selectedValue === "BLOCKED") {
        let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { ClientStatus: selectedValue }, apiheader)
        setuserList(data.Response.Clients)
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
              {/* <Component.ButtonBase onclick={test} title={"Add new Clients"} bg={"primary"} icon={<Icons.add />}  /> */}
              <div className="app__Users-table">
                <div className="search-container">
                  <div className='search__group'>
                    <input type="text" placeholder="Search by name or email or phone....." name="search" value={searchValue} onChange={handleInputChange} />
                    <button type="submit" onClick={handleSearchClick}>
                      <Icons.Search color='#fff' size={25} />
                    </button>
                  </div>

                  <div className='filter__group'>
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
                        value="BLOCKED"
                        checked={selectedOption === "BLOCKED"}
                        onChange={handleOptionChange}
                        className="inactive-radio form-check-input   "

                      />
                      Blocked
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="filter"
                        value="All"
                        checked={selectedOption === "All"}
                        onChange={handleOptionChange}
                        className="inactive-radio form-check-input"
                      />
                      All
                    </label>
                  </div>
                </div>
                <Component.ClientTable usersList={usersList} userList={userList} />
              </div>
            </div>
            <div className="pagination ">
              <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                <Pagination count={pageCount} page={page} onChange={handleChange} />
              </Box>
            </div>

          </> : 'loader..................'
      }
    </>
  )
}

export default Clients
