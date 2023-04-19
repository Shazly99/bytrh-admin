import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from "../../../context/Store";
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { apiheader, GetData, PostData } from './../../../utils/fetchData';
import translateCategories from './translateCategories';
import './initialTranslate'



const AnimalCat = () => {
  const [animal, setAnimal] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTableImg, SkeletonSearch, SkeletonFilters } = useSkeletonTable();
  let { isLang } = useContext(VendersContext);

  // pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // get animalcategories
  const animalcategories = async (page) => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/animalcategories`, { IDPage: page }, apiheader).then(({ data }) => {
      setAnimal(data.Response.AnimalCategories)
      setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          animalcategories();
        }, (retryAfter || 60) * 1000);
      }
    })
  }

  // pagination
  const handleChange = (event, value) => {
    setPage(value);
  };
  // change status
  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE") {
      await animalcategoriesStatus(id).then((res) => {
        toast.success('Updated Successfully', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.UploadItem color='#3182CE' size={20} />,
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
          icon: <Icons.UploadItem color='#3182CE' size={20} />,
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
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/animalcategories/status/${id}`, apiheader)
  }

  // search and filter 
  const handleSearchClick = () => {
    searchGetData(searchValue)
  };
  const handleInputChange = (event) => {
    if (event.target.value === '') {
      animalcategories(page)
    }
    setSearchValue(event.target.value);
  };
  const searchGetData = async (searchValue) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/animalcategories`, { IDPage: page, SearchKey: searchValue }, apiheader)
    setAnimal(data.Response.AnimalCategories)
    setPagesNumber(data.Response.Pages);

  }

  // filter
  const [selectedOption, setSelectedOption] = useState('All');

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filter your content based on the selected option 
    if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE") {
      let { data } = await PostData(`https://bytrh.com/api/admin/animalcategories`, { IDPage: page, AnimalCategoryStatus: selectedValue }, apiheader)
      setAnimal(data.Response.AnimalCategories)
      setPagesNumber(data.Response.Pages);

    } else if (selectedValue === "All") {
      animalcategories()
    }
  };

  useEffect(() => {
    animalcategories(page)
    window.scrollTo(0, 0);
  }, [page,isLang])
  useEffect(() => {
  }, [page, PagesNumber])


  return (
    <>
      <div className="app__Users ">
        <div className="app__Users-table">
          <div className="search-container">
            <div className="search_and__btn w-100" >
              {isLoader ? <>
                <Component.ButtonBase title={translateCategories[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/animals/categories/addAnimal" />
                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                  <input type="text" placeholder={translateCategories[isLang]?.placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button>
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

                  {isLang === 'ar' ? 'الكـل' : 'All'}
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
                  {isLang === 'ar' ? 'نشــط' : 'Active'}
                </label>
              </> : SkeletonFilters(10, 90)}
              {isLoader ? <>
                <label style={{ whiteSpace: 'nowrap' }}>
                  <input
                    type="radio"
                    name="filter"
                    value="INACTIVE"
                    checked={selectedOption === "INACTIVE"}
                    onChange={handleOptionChange}
                    className="inactive-radio form-check-input"
                  />
                  {isLang === 'ar' ? 'غير نشـط' : 'InActive'}
                </label>
              </> : SkeletonFilters(10, 90)}
            </div>
          </div>
          {isLoader ? <>
            <Table responsive={true} className='rounded-3 '>
              <thead>
                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  {translateCategories[isLang]?.TableHeader?.map((el, i) => (
                    <th key={i}>{el}</th>
                  ))}
                </tr>
              </thead>
              <tbody className='text-center'>
                {
                  animal?.map((item, index) => (
                    <tr key={index}>
                      <td >
                        <div >
                          <img src={item?.AnimalCategoryImage} className=' rounded-3'
                            alt={item?.AnimalCategoryName} loading="lazy"
                            width={'250px'}
                            height={'150px'} />
                        </div>
                      </td>

                      <td >
                        <div>
                          {item?.AnimalCategoryName}
                        </div>
                      </td>

                      <td >
                        <div>
                          <span style={{ height: 'fit-content !important' }} className={`  ${item?.AnimalCategoryActive === 1 && 'txt_delivered'}  ${item?.AnimalCategoryActive === 0 && 'txt_rejected'} `} >
                            {item?.AnimalCategoryActive === 1 ?
                              isLang === 'ar' ? 'نشــط' : 'Active'
                              :
                              isLang === 'ar' ? 'غير نشـط' : 'InActive'
                            }
                          </span>
                        </div>
                      </td>

                      <td>
                        <div>

                          <span>
                            <DropdownButton
                              id={`dropdown-${item.IDAnimalCategory}`}
                              title={translateCategories[isLang].ActionsLabel}
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDAnimalCategory, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/categories/editAnimal/${item.IDAnimalCategory}`}>
                                {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                              </Dropdown.Item>

                              <div className="w-100 bg-dark opacity-25" style={{ height: '1px' }}></div>

                              {
                                item?.AnimalCategoryActive === 1 ? '' : item?.AnimalCategoryActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">
                                  {isLang === 'ar' ? 'نشـط' : 'Active'}
                                </Dropdown.Item>
                              }
                              {
                                item?.AnimalCategoryActive === 0 ? '' : item?.AnimalCategoryActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">
                                  {isLang === 'ar' ? 'غير نشـط' : 'InActive'}
                                </Dropdown.Item>
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
          </> : SkeletonTableImg()}
        </div>

      </div>
      <div className="pagination "  dir="ltr">
        {
          pageCount &&
          <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </Box>
        }
      </div>
    </>
  )
}

export default AnimalCat