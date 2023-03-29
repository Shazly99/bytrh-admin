import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import Component from '../../../constants/Component';
import Icons from "../../../constants/Icons.js";
import { VendersContext } from "../../../context/Store";
import { PostData } from '../../../utils/fetchData';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { apiheader } from './../../../utils/fetchData';
import './Users.scss';
import initialTranslate from './initialTranslate';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '$mainColor',
            color: '#FFFFFF',
          },
        },
      },
    },
  },
});

function Users() {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslate)
  const handelTranslate = () => {
    setTranslate(initialTranslate)
  }
  const [page, setPage] = useState(1);
  const [usersList, setuserList] = useState(null);
  const [PagesNumber, setPagesNumber] = useState('')
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonSearch } = useSkeletonTable();
  const handleChange = (event, value) => {
    setPage(value);
  };
 

  const userList = async (page) => {
    try {
      await PostData(`https://bytrh.com/api/admin/users`, { IDPage: page }, apiheader).then(({ data }) => {
        setuserList(data.Response.Users);
        setPagesNumber(data.Response.Pages);
        const timeoutId = setTimeout(() => {
          setIsloader(true)
        }, 0);
        return () => clearTimeout(timeoutId);
      });
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
    window.scrollTo(0, 0);
    userList(page)
    handelTranslate()
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
                <Component.ButtonBase  title={translate[isLang].add[0].btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/user/addUser" />
                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                  <input placeholder={translate[isLang]?.placeholder} type="text"   name="search" value={searchValue} onChange={handleInputChange} />
                  <button  type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button >
                </div>
              </> : SkeletonSearch(40, "100%")}
            </div>
            <div className='filter__group'>
              {
                translate[isLang]?.FilterStatus?.map((item, index) => (
                  <>
                    {isLoader ? <>
                      <label className='active' >
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
          <Component.UsersTable isLoader={isLoader} toastTranslate={translate[isLang]?.toast}  tabelTranslate={translate[isLang]?.TableHeader}actionsTranslate={translate[isLang]?.Actions} statusTranslate={translate[isLang]?.FilterStatus} usersList={usersList} userList={userList} />
        </div>

      </div>
      <div className="pagination " dir="ltr">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
        <ThemeProvider theme={theme}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </ThemeProvider>
        </Box>
      </div>


    </>
  )
}

export default Users
