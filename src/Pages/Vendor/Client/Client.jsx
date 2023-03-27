import { Pagination, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import Component from '../../../constants/Component';
import Icons from "../../../constants/Icons.js";
import { VendersContext } from "../../../context/Store";
import { PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';
import initialTranslate from './initialTranslate';

const Clients = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }
  const [page, setPage] = React.useState(1);
  const [usersList, setuserList] = React.useState([]);
  const [PagesNumber, setPagesNumber] = React.useState('')
  const [isLoader, setIsloader] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const userList = _.debounce(async (page) => {
    await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page }, apiheader).then(({ data }) => {
      setuserList(data.Response.Clients)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    })
  }, 1000)
  useEffect(() => {
    userList(page)
    window.scrollTo(0, 0);
    handelTranslate()
  }, [page])

  // to fixed problem because Pagination count need a number 
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  const [searchValue, setSearchValue] = useState('');
  // search by click
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      userList(page)
    }
    setSearchValue(event.target.value);
  };
  const searchGetData = _.debounce(async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setuserList(data.Response.Clients)
    setPagesNumber(data.Response.Pages);
  }, 3000)
  // filter
  const [selectedOption, setSelectedOption] = useState('All');
  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value; 
    setSelectedOption(selectedValue);

    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE" || selectedValue === "BLOCKED") {
      let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page, ClientStatus: selectedValue }, apiheader)
      setuserList(data.Response.Clients)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      userList()
    }
  };
  useEffect(() => {
  }, [page, PagesNumber,selectedOption])

  const SkeletonSearch = (w, h) => {
    return (
      <Skeleton variant='rounded' animation='wave' height={w} width={h} />
    )
  }
  return (
    <>

      <div className="app__Users ">
        {/* <Component.ButtonBase onclick={test} title={"Add new Clients"} bg={"primary"} icon={<Icons.add />}  /> */}
        <div className="app__Users-table">
          <div className="search-container">
            {isLoader ? <>
              <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                <input type="text" placeholder={translate[isLang]?.placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                <button type="submit" onClick={handleSearchClick}>
                  <Icons.Search color='#fff' size={25} />
                </button>
              </div>
            </> : SkeletonSearch(40, "60%")}
            <div className='filter__group'>
              {
                translate[isLang]?.FilterStatus?.map((item, index) => (
                  <>
                    {isLoader ? <>
                      <label key={index} className='active' >
                        <input
                          type="radio"
                          name="filter"
                          value={item.value}
                          checked={selectedOption === item.value}
                          onChange={handleOptionChange}
                          className="active-radio form-check-input"
                        />
                        {item.text }
                      </label>
                    </> : SkeletonSearch(10, 90)}
                  </>
                ))
              }
            </div>
          </div>
          <Component.ClientTable isLoading={isLoader} toastTranslate={translate[isLang]?.toast} tabelTranslate={translate[isLang]?.TableHeader}actionsTranslate={translate[isLang]?.Actions} statusTranslate={translate[isLang]?.FilterStatus} usersList={usersList} userList={userList} />
        </div>
      </div>
      <div className="pagination " dir="ltr">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={pageCount} page={page}  onChange={handleChange} />
        </Box>
      </div>

    </>
  )
}

export default Clients
