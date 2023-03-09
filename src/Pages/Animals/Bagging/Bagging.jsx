import React from 'react'
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";

import Component from '../../../constants/Component'
import Icons from '../../../constants/Icons'
import { GetData, PostData, apiheader } from './../../../utils/fetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Bagging = () => {
  const [animal, setAnimal] = useState(null)
  // const [page, setPage] = useState(1);
  // const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');
  // pagination
  // const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // get baggings
  const baggings = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings`, { }, apiheader).then(({ data }) => {
      setAnimal(data.Response)
      // setPagesNumber(data.Response.Pages);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          baggings();
        }, (retryAfter || 60) * 1000);
      }
    })
  }

  // pagination
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  // change status
  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE") {
      await baggingsStatus(id).then((res) => {
        toast.success('Updated Successfully', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.uploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
      })
      await baggings()
    } else if (action === "INACTIVE") {
      await baggingsStatus(id).then((res) => {
        toast.success('Updated Successfully', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.uploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
      })
      await baggings()
    }
  };
  const baggingsStatus = async (id) => {
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/baggings/status/${id}`, apiheader)
  }
 
 

  useEffect(() => {
    baggings()
  }, [])
  // useEffect(() => {
  // }, [page, PagesNumber])

  return (
    <>
    {
      animal ?
        <>
          <div className="app__Users ">
            <Component.ButtonBase title={"Add  "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/animals/bagging/addbagging" />
            <div className="app__Users-table">
              {/* <div className="search-container">
                <div className='search__group'>
                  <input className='shadow' type="text" placeholder="Search by animal category....." name="search" value={searchValue} onChange={handleInputChange} />
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
                          checked={selectedOption === "All"}
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
              </div> */}
              <Table responsive={true} className='rounded-3 '>
                <thead>
                  <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                    <th>Bagging Name</th> 
                    <th>Bagging Status</th> 
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    animal?.map((item, index) => (
                      <tr key={index}>
  

                        <td >
                          <div>
                            {item?.BaggingName}
                          </div>
                        </td>

                        <td >
                          <div>
                            <span style={{ height: 'fit-content !important' }} className={`  ${item?.BaggingActive === 1 && 'txt_delivered'}  ${item?.BaggingActive === 0 && 'txt_rejected'} `} >
                              {item?.BaggingActive === 1 ? 'Active' : "InActive"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div>

                            <span>
                              <DropdownButton
                                id={`dropdown-${item.IDBagging}`}
                                title="Actions"
                                variant="outline-success"
                                onSelect={(eventKey) => handleActionSelect(item.IDBagging, eventKey)}
                                className="DropdownButton "
                                drop={'down-centered'}
                              >
                                <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/bagging/editbagging/${item.IDBagging}`}>
                                  Edit
                                </Dropdown.Item>

                                {
                                  item?.BaggingActive === 1 ? '' : item?.BaggingActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                }
                                {
                                  item?.BaggingActive === 0 ? '' : item?.BaggingActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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
          {/* <div className="pagination ">
            <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
              <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Box>
          </div> */}
        </> : <Component.Loader />
    }
  </>
  )
}

export default Bagging