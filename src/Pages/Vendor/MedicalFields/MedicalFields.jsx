import React from 'react'
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import { GetData, PostData, apiheader } from '../../../utils/fetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';

const MedicalFields = () => {
  const [medicalFields, setMedicalFields] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');

  const MedicalFieldscList = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/medicalfields`, { IDPage: page }, apiheader).then(({ data }) => {
      setMedicalFields(data.Response.MedicalFields)
      console.log(data.Response.MedicalFields);
      setPagesNumber(data.Response.Pages);
    }).then((error) => {

    })
  }

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE") {
      console.log(id);
      await MedicalFieldscategoriesStatus(id).then((res) => {
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
      await MedicalFieldscList()
    } else if (action === "INACTIVE") {
      await MedicalFieldscategoriesStatus(id).then((res) => {
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
      await MedicalFieldscList()

    }
  };
  const MedicalFieldscategoriesStatus = async (id) => {
    let data = await GetData(`${process.env.REACT_APP_API_URL}/admin/medicalfields/status/${id}`, apiheader)
    console.log(data);
  }

  const handleSearchClick = () => {
    searchGetData(searchValue)
  };

  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/medicalfields`, { MedicalFieldStatus: selectedValue }, apiheader)
      setMedicalFields(data.Response.MedicalFields)
      console.log(selectedValue);
    } else if (selectedValue === "INACTIVE") {
      console.log(selectedValue);
      let { data } = await PostData(`https://bytrh.com/api/admin/medicalfields`, { MedicalFieldStatus: selectedValue }, apiheader)
      setMedicalFields(data.Response.MedicalFields)
    } else if (selectedValue === "All") {
      MedicalFieldscList()
    }
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/medicalfields`, { SearchKey: searchValue }, apiheader)
    console.log(data);
    setMedicalFields(data.Response.MedicalFields)
  }

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      MedicalFieldscList(page)
    }
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    MedicalFieldscList()
  }, [])

  useEffect(() => {
  }, [selectedOption, medicalFields])





  return (
    <>
      {
        medicalFields ?
          <>
            <div className="app__Users ">
              <Component.ButtonBase title={"Add "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'}  />} path="/medicalfields/add" />
              <div className="app__Users-table">
                <div className="search-container">
                  <div className='search__group'>
                    <input type="text" placeholder="Search by medical field....." name="search" value={searchValue} onChange={handleInputChange} />
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
                      <th>Medical Field Name</th>
                      <th>Medical Field status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {
                      medicalFields?.map((item, index) => (
                        <tr key={index}>
                          <td >
                            <div>
                              {item?.MedicalFieldName}
                            </div>
                          </td>


                          <td >
                            <div>
                              <span style={{ height: 'fit-content !important' }} className={`  ${item?.MedicalFieldActive === 1 && 'txt_delivered'}  ${item?.MedicalFieldActive === 0 && 'txt_rejected'} `} >
                                {item?.MedicalFieldActive === 1 ? 'Active' : "InActive"}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>
                              <span>
                                <DropdownButton
                                  id={`dropdown-${item.IDMedicalField}`}
                                  title="Actions"
                                  variant="outline-success"
                                  onSelect={(eventKey) => handleActionSelect(item.IDMedicalField, eventKey)}
                                  className="DropdownButton "
                                  drop={'down-centered'}
                                >
                                  <Dropdown.Item eventKey="Edite" as={Link} to={`/medicalfields/edit/${item.IDMedicalField}`}>
                                    Edit
                                  </Dropdown.Item>
                                  {
                                    item?.MedicalFieldActive === 1 ? '' : item?.UserStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                  }
                                  {
                                    item?.MedicalFieldActive === 0 ? '' : item?.UserStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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

export default MedicalFields