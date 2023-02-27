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

const Areas = () => {
  const [areas, setAreas] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');

  const AreascList = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/location/areas`, { IDPage: page }, apiheader).then(({ data }) => {
      setAreas(data.Response.Areas)
      console.log(data.Response.Areas);
      setPagesNumber(data.Response.Pages);
    }).then((error) => {

      /*         if (error.response && error.response.status === 429) {
                  const retryAfter = error.response.headers['retry-after'];
                  setTimeout(() => {
                      AreascList();
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
      console.log(id);
      await AreascategoriesStatus(id).then((res) => {
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
      await AreascList()
    } else if (action === "INACTIVE") {
      await AreascategoriesStatus(id).then((res) => {
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
      await AreascList()

    }
  };
  const AreascategoriesStatus = async (id) => {
    let data= await GetData(`${process.env.REACT_APP_API_URL}/admin/location/areas/status/${id}`, apiheader)
    console.log(data);
  }

  // search and filter 

  const handleSearchClick = () => {
    searchGetData(searchValue)
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      AreascList(page)
    }
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/location/areas`, { SearchKey: searchValue }, apiheader)
    console.log(data);
    setAreas(data.Response.Areas)
  }
  // filter
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/areas`, { AreaStatus: selectedValue }, apiheader)
      setAreas(data.Response.Areas)
    } else if (selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/location/areas`, { AreaStatus: selectedValue }, apiheader)
      setAreas(data.Response.Areas)
    } else if (selectedValue === "All") {
      AreascList()
    }
  };
  useEffect(() => {
    AreascList()
  }, [])
  return (
    <>
      <div className="app__Users ">
        <Component.ButtonBase title={"Add New Area"} bg={"primary"} icon={<Icons.add />} path="/location/areas/addareas" />
        <div className="app__Users-table">
          <div className="search-container">
            <div className='search__group'>
              <input type="text" placeholder="Search by area....." name="search" value={searchValue} onChange={handleInputChange} />
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
                  value="All"
                  checked={selectedOption === "All"}
                  onChange={handleOptionChange}
                  className="inactive-radio form-check-input"

                />
                All
              </label>
            </div>
          </div>
          <Table responsive={true} className='rounded-3 '>
            <thead>
              <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                <th>Country Name</th>
                <th>City Name</th>
                <th>Area Name</th>
                <th>City status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                areas?.map((item, index) => (
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
                        {item?.AreaName}
                      </div>
                    </td>

                    <td >
                      <div>
                        <span style={{ height: 'fit-content !important' }} className={`  ${item?.AreaActive === 1 && 'txt_delivered'}  ${item?.AreaActive === 0 && 'txt_rejected'} `} >
                          {item?.AreaActive === 1 ? 'Active' : "InActive"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>
                          <DropdownButton
                            id={`dropdown-${item.IDArea}`}
                            title="Actions"
                            variant="outline-success"
                            onSelect={(eventKey) => handleActionSelect(item.IDArea, eventKey)}
                            className="DropdownButton "
                            drop={'down-centered'}
                          >
                            <Dropdown.Item eventKey="Edite" as={Link} to={`/location/areas/editareas/${item.IDArea}`}>
                              Edit
                            </Dropdown.Item>
                            {
                              item?.AreaActive === 1 ? '' : item?.UserStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                            }
                            {
                              item?.AreaActive === 0 ? '' : item?.UserStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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

    </>
  )
}

export default Areas