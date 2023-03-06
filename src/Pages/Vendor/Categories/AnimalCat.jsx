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

const AnimalCat = () => {
  const [animal, setAnimal] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');

  const animalcategories = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories`, { IDPage: page }, apiheader).then(({ data }) => {

      setAnimal(data.Response.AnimalCategories)
      setPagesNumber(data.Response.Pages);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          animalcategories();
        }, (retryAfter || 60) * 1000);
      }
    })
  }

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE") {
      await animalcategoriesStatus(id).then((res) => {
        console.log(res);
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
      await animalcategories()
    } else if (action === "INACTIVE") {
      await animalcategoriesStatus(id).then((res) => {
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
      await animalcategories()
    }
  };
  const animalcategoriesStatus = async (id) => {
    let { data } = await GetData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/status/${id}`, apiheader)
  }

  // search and filter 

  const handleSearchClick = () => {
    searchGetData(searchValue)
  };

  const handleInputChange = (event) => {
    if (event.target.value === '') {
      animalcategories(page)
    }
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/animalcategories`, {IDPage: page, SearchKey: searchValue }, apiheader)
    console.log(data);
    setAnimal(data.Response.AnimalCategories)
    setPagesNumber(data.Response.Pages); 

  }

  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE"||selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/animalcategories`, { IDPage: page,AnimalCategoryStatus: selectedValue }, apiheader)
      setAnimal(data.Response.AnimalCategories)
      setPagesNumber(data.Response.Pages); 

    }  else if (selectedValue === "All") {
      animalcategories()
    }
  };
  useEffect(() => {
    animalcategories(page)
  }, [page])

  return (

    <>
      {
        animal ?
          <>
            <div className="app__Users ">
              <Component.ButtonBase title={"Add  "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/categ/animals/addAnimal" />
              <div className="app__Users-table">
                <div className="search-container">
                  <div className='search__group'>
                    <input type="text" placeholder="Search by animal category....." name="search" value={searchValue} onChange={handleInputChange} />
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
                      <th>Animal Category Name</th>
                      <th>Animal Category Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {
                      animal?.map((item, index) => (
                        <tr key={index}>
                          <td >
                            <div>
                              {item?.AnimalCategoryName}
                            </div>
                          </td>

                          <td >
                            <div>
                              <span style={{ height: 'fit-content !important' }} className={`  ${item?.AnimalCategoryActive === 1 && 'txt_delivered'}  ${item?.AnimalCategoryActive === 0 && 'txt_rejected'} `} >
                                {item?.AnimalCategoryActive === 1 ? 'Active' : "InActive"}
                              </span>
                            </div>
                          </td>

                          <td>
                            <div>

                              <span>
                                <DropdownButton
                                  id={`dropdown-${item.IDAnimalCategory}`}
                                  title="Actions"
                                  variant="outline-success"
                                  onSelect={(eventKey) => handleActionSelect(item.IDAnimalCategory, eventKey)}
                                  className="DropdownButton "
                                  drop={'down-centered'}
                                >
                                  <Dropdown.Item eventKey="Edite" as={Link} to={`/categ/animals/editAnimal/${item.IDAnimalCategory}`}>
                                    Edit
                                  </Dropdown.Item>

                                  {
                                    item?.AnimalCategoryActive === 1 ? '' : item?.AnimalCategoryActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                  }
                                  {
                                    item?.AnimalCategoryActive === 0 ? '' : item?.AnimalCategoryActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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

export default AnimalCat