import React from 'react'
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import { GetData, PostData, apiheader } from '../../../../utils/fetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';

const Cities = () => {
  const [Cities, setCities] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');

  const CitiescList = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/cities`, { IDPage: page }, apiheader).then(({ data }) => {
      setCities(data.Response.Cities)
      console.log(data);
      setPagesNumber(data.Response.Pages);
    }).then((error) => {

      /*         if (error.response && error.response.status === 429) {
                  const retryAfter = error.response.headers['retry-after'];
                  setTimeout(() => {
                      CitiescList();
                  }, (retryAfter || 60) * 1000);
              } */
    })
  }

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE") {
      await CitiescategoriesStatus(id).then((res) => {
        toast.success('Status up to date', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.uploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
      })
      await CitiescList()
    } else if (action === "INACTIVE") {
      await CitiescategoriesStatus(id).then((res) => {
        toast.success('Status up to date', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.uploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#0a0',
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
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { SearchKey: searchValue }, apiheader)
    console.log(data);
    setCities(data.Response.Cities)
  }
  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { CityStatus: selectedValue }, apiheader)
      setCities(data.Response.Cities)
    } else if (selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/cities`, { CityStatus: selectedValue }, apiheader)
      setCities(data.Response.Cities)
    } else if (selectedValue === "All") {
      CitiescList()
    }
  };
  useEffect(() => {
    CitiescList()
  }, [])
  return (
    <>
      {
        Cities ?
          <>
            <div className="app__Users ">
              <Component.ButtonBase title={"Add "} bg={"primary"} icon={<Icons.add />} path="/location/cities/addcity" />
              <div className="app__Users-table">
                <div className="search-container">
                  <div className='search__group'>
                    <input type="text" placeholder="Search by city....." name="search" value={searchValue} onChange={handleInputChange} />
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
 
                  </div>
                </div>
                <Table responsive={true} className='rounded-3 '>
                  <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                      <th>Country Name</th>
                      <th>City Name</th>
                      <th>City status</th>
                      <th>Action</th>
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
                                {item?.CityActive === 1 ? 'Active' : "InActive"}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>
                              <span>
                                <DropdownButton
                                  id={`dropdown-${item.IDCity}`}
                                  title="Actions"
                                  variant="outline-success"
                                  onSelect={(eventKey) => handleActionSelect(item.IDCity, eventKey)}
                                  className="DropdownButton "
                                  drop={'down-centered'}
                                >
                                  <Dropdown.Item eventKey="Edite" as={Link} to={`/location/cities/editcity/${item.IDCity}`}>
                                    Edit
                                  </Dropdown.Item>
                                  {
                                    item?.CityActive === 1 ? '' : item?.UserStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                  }
                                  {
                                    item?.CityActive === 0 ? '' : item?.UserStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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

export default Cities