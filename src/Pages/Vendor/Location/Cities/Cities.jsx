import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton,NavDropdown, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from "../../../../context/Store";
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import useSkeletonTable from '../../../../utils/useSkeletonTable';
import initialTranslation from "./Translation";

const Cities = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => setTranslate(initialTranslation)

  const [Cities, setCities] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonSearch, SkeletonFilters } = useSkeletonTable();

  const CitiescList = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/cities`, { IDPage: page }, apiheader).then(({ data }) => {
      setCities(data.Response.Cities)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          CitiescList();
        }, (retryAfter || 60) * 1000);
      }
    })
  }

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE" || action === "INACTIVE") {
      await CitiescategoriesStatus(id).then((res) => {
        toast.success(<strong>{translate[isLang].toast.update}</strong>, {
          duration: 4000,
          position: 'buttom-center',
          // icon: <Icons.UploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#3182CE',
            secondary: '#fff',
          },
        });
      })
      await CitiescList()
    }
  };
  const CitiescategoriesStatus = async (id) => {
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/location/cities/status/${id}`, apiheader)
  }


  // search and filter 

  const handleSearchClick = () => {
    searchGetData(searchValue)
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      CitiescList(page)
    }
    setSearchValue(event.target.value);
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setCities(data.Response.Cities)
    setPagesNumber(data.Response.Pages);
  }
  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { IDPage: page, CityStatus: selectedValue }, apiheader)
      setCities(data.Response.Cities)
      setPagesNumber(data.Response.Pages);
    } else if (selectedValue === "All") {
      CitiescList()
    }
  };
  useEffect(() => {
    CitiescList(page)
    window.scrollTo(0, 0);
  }, [page])
  useEffect(() => {
  }, [page, PagesNumber])
  return (

    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container">
            <div className="search_and__btn w-100">
              {isLoader ? <>
                <Component.ButtonBase title={translate[isLang].add.btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/location/cities/addcity" />
                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>

                  <input type="text" placeholder={translate[isLang].placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button>
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
                        {item.text}
                      </label>
                    </> : SkeletonSearch(10, 90)}
                  </>
                ))
              }
            </div>
          </div>
          {isLoader ? <>
            <Table responsive={true} className='rounded-3 '>
              <thead>
                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  {
                    translate[isLang]?.TableHeader?.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className='text-center'>
                {
                  Cities?.map((item, index) => (
                    <tr key={index}>
                      <td >
                        <div>
                          {item?.CountryName}
                        </div>
                      </td>

                      <td >
                        <div>
                          {item?.CityName}
                        </div>
                      </td>

                      <td >
                        <div>
                          <span style={{ height: 'fit-content !important' }} className={`  ${item?.CityActive === 1 && 'txt_delivered'}  ${item?.CityActive === 0 && 'txt_rejected'} `} >
                          {
                                translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.CityActive === item?.CityActive)
                                  .map((status, index) => (
                                    <React.Fragment key={index}>
                                      {item?.CityActive === status.CityActive ? status.text : ''}
                                    </React.Fragment>
                                  ))
                              }
                          </span>
                        </div>
                      </td>

                      <td>
                        <div>
                          <span>
                            <DropdownButton
                              id={`dropdown-${item.IDCity}`}
                              title={translate[isLang]?.Actions.action}
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDCity, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item  className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"}eventKey="Edite" as={Link} to={`/location/cities/editcity/${item.IDCity}`}>
                                {translate[isLang]?.Actions.edit}
                              </Dropdown.Item>
                              <NavDropdown.Divider />
 
                              {
                                translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                  <React.Fragment key={index}>
                                    {item?.CityActive === status.CityActive ? '' : item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
                                  </React.Fragment>
                                ))
                              }
                            </DropdownButton>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                }

              </tbody>

            </Table>
          </> : SkeletonTable()}
        </div>

      </div>
      <div className="pagination " dir="ltr">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Box>
      </div>
    </>
  )
}

export default Cities