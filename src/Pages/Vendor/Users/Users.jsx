import React, { useEffect, useState } from 'react'
import Component from '../../../constants/Component'
import './Users.scss'
import Icons from "../../../constants/Icons.js";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { GetData, PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';
import Img from '../../../assets/Img';
import useSkeletonTable from '../../../utils/useSkeletonTable';

function Users() {
  const [page, setPage] = useState(1);
  const [usersList, setuserList] = useState(null);
  const [PagesNumber, setPagesNumber] = useState('')
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonSearch,SkeletonFilters } = useSkeletonTable();
  const handleChange = (event, value) => {
    setPage(value);
  };
  const test = () => {

  }

  const userList = async (page) => {
    try {
      await PostData(`https://bytrh.com/api/admin/users`, { IDPage: page }, apiheader).then(({ data }) => {

        setuserList(data.Response.Users);
        setPagesNumber(data.Response.Pages);
        console.log(data.Response.Pages)
        const timeoutId = setTimeout(() => {
          setIsloader(true)
        }, 1000);
        return () => clearTimeout(timeoutId);
      });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          userList(page);
        }, (retryAfter || 1) * 1000);
      }
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    userList(page)
  }, [page])
  // to fixed problem because Pagination count need a number 
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;


  const [searchValue, setSearchValue] = React.useState('');
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };
  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/users`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setuserList(data.Response.Users)
    setPagesNumber(data.Response.Pages);

  }
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      userList(page)
    }
    setSearchValue(event.target.value);
  };

  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE" || selectedValue === "PENDING") {
      let { data } = await PostData(`https://bytrh.com/api/admin/users`, { IDPage: page, UserStatus: selectedValue }, apiheader)
      setuserList(data.Response.Users)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      userList()
    }
  };
  useEffect(() => {
  }, [page, PagesNumber])
  return (
    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container   ">

            <div className="search_and__btn   w-100">
              {isLoader ? <>
                <Component.ButtonBase onclick={test} title={"Add  "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/user/addUser" />
                <div className='search__group'>
                  <input type="text" placeholder="Search by name or email or phone....." name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button >
                </div>
              </> : SkeletonSearch(40, "100%")}
            </div>
            <div className='filter__group'>
              {isLoader ? <>
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
                        checked={selectedOption === "All"}
                        onChange={handleOptionChange}
                        className={`inactive-radio form-check-input `}
                      />
                  }

                  All
                </label>
              </> : SkeletonFilters(10, 90)}

              {isLoader ? <>
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
              </> : SkeletonFilters(10, 90)}

              {isLoader ? <>
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
              </> : SkeletonFilters(10, 90)}

              {isLoader ? <>
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
              </> : SkeletonFilters(10, 90)}

            </div>
          </div>
          <Component.UsersTable isLoader={isLoader} usersList={usersList} userList={userList} />
        </div>

      </div>
      <div className="pagination ">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Box>
      </div>


    </>
  )
}

export default Users
