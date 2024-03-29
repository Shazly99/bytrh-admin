import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from '../../../context/Store';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { GetData, PostData, apiheader } from './../../../utils/fetchData';
import translateSubCategories from './translateSubCate';


const AdoptionsAnimals = () => {
    const [animal, setAnimal] = useState(null)
    const [page, setPage] = useState(1);
    const [PagesNumber, setPagesNumber] = useState('')
    const [searchValue, setSearchValue] = useState('');
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTableImg, SkeletonSearch, SkeletonFilters } = useSkeletonTable();
    let { isLang } = useContext(VendersContext);

    // pagination
    const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

    // get AnimalSubCategories
    const AnimalSubCategories = async (page) => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories`, { IDPage: page, IDAnimalCategory: 16 }, apiheader).then(({ data }) => {
            setAnimal(data.Response.AnimalSubCategories)
            setPagesNumber(data.Response.Pages);
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    AnimalSubCategories();
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
            await AnimalSubCategoriesStatus(id).then((res) => {
                toast.success(<strong> {translateSubCategories[isLang]?.toastStaus}   </strong>, {
                    duration: 4000,
                    position: 'top-center',
                    icon: <Icons.UploadItem color='#3182CE' size={20} />,
                    iconTheme: {
                        primary: '#0a0',
                        secondary: '#fff',
                    },
                });
            })
            await AnimalSubCategories()
        } else if (action === "INACTIVE") {
            await AnimalSubCategoriesStatus(id).then((res) => {
                toast.success(<strong> {translateSubCategories[isLang]?.toastStaus}   </strong>, {

                    duration: 4000,
                    position: 'top-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await AnimalSubCategories()
        } else if (action === 'AllowAdoption') {
            console.log(action);
            await AnimalSubCategoriesAdoption({
                IDAnimalSubCategory: id,
                SubCategoryAdoption: 1
            }).then((res) => {
                toast.success(<strong> {translateSubCategories[isLang]?.toastStaus}   </strong>, {

                    duration: 4000,
                    position: 'top-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await AnimalSubCategories()
        } else if (action === 'NotAllowAdoption') {
            console.log(action);
            await AnimalSubCategoriesAdoption({
                IDAnimalSubCategory: id,
                SubCategoryAdoption: 0
            }).then((res) => {
                toast.success(<strong> {translateSubCategories[isLang]?.toastStaus}   </strong>, {

                    duration: 4000,
                    position: 'top-center',
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await AnimalSubCategories()
        }
    };
    const AnimalSubCategoriesStatus = async (id) => {
        return await GetData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/status/${id}`, apiheader)
    }
    const AnimalSubCategoriesAdoption = async (id_Data) => {
        return await PostData(`${process.env.REACT_APP_API_URL}/admin/animalsubcategories/edit`, id_Data, apiheader)
    }

    // search and filter 
    const handleSearchClick = () => {
        searchGetData(searchValue)
    };
    const handleInputChange = (event) => {
        if (event.target.value === '') {
            AnimalSubCategories(page)
        }
        setSearchValue(event.target.value);
    };
    const searchGetData = async (searchValue) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/animalsubcategories`, { IDPage: page, SearchKey: searchValue }, apiheader)
        setAnimal(data.Response.AnimalSubCategories)
        setPagesNumber(data.Response.Pages);

    }

    // filter
    const [selectedOption, setSelectedOption] = useState('All');

    const handleOptionChange = async (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        // filter your content based on the selected option 
        if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE") {
            let { data } = await PostData(`https://bytrh.com/api/admin/animalsubcategories`, { IDPage: page, AnimalSubCategoryStatus: selectedValue }, apiheader)
            setAnimal(data.Response.AnimalSubCategories)
            setPagesNumber(data.Response.Pages);

        } else if (selectedValue === "All") {
            AnimalSubCategories()
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            AnimalSubCategories(page)
            window.scrollTo(0, 0);
        }, 200);
        return () => clearTimeout(timeoutId);

    }, [page, isLang])
    useEffect(() => {
    }, [page, PagesNumber])



    return (
        <>
            <div className="app__Users ">
                <div className="app__Users-table">
                    <div className="search-container">
                        <div className="search_and__btn w-100">
                            <Component.ButtonBase title={translateSubCategories[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/animals/adoptionsSubcategories/addsubcategories" />
                            {isLoader ? <>
                                <div className={`${isLang === 'ar' ? ' search__groupAr  ' : 'search__group'}  `}>
                                    <input type="text" placeholder={translateSubCategories[isLang]?.placeholder} name="search" value={searchValue} onChange={handleInputChange} />
                                    <button type="submit" onClick={handleSearchClick}>
                                        <Icons.Search color='#fff' size={25} />
                                    </button>
                                </div>
                            </> : SkeletonSearch(40, "100%")}
                        </div>
                        {/*       <div className='filter__group'>
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

                        </div> */}
                    </div>
                    {isLoader ? <>
                        <Table responsive={true} className='rounded-3 '>
                            <thead>
                                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                    {translateSubCategories[isLang]?.TableHeader?.map((el, i) => (
                                        <th key={i}>{el}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    animal?.map((item, index) => (
                                        <tr key={index}>
                                            {/* <td >
                                                <div  >
                                                    <img
                                                        src={item?.AnimalSubCategoryImage}
                                                        className=' rounded-3'
                                                        alt={item?.AnimalCategoryName}
                                                        loading="lazy"
                                                        width={'250px'}
                                                        height={'150px'} />
                                                </div>
                                            </td>

                                            <td >
                                                <div>
                                                    {item?.AnimalCategoryName}
                                                </div>
                                            </td> */}

                                            <td >
                                                <div>
                                                    {item?.AnimalSubCategoryName}
                                                </div>
                                            </td>

                                            <td >
                                                <div>
                                                    <span style={{ height: 'fit-content !important' }} className={`  ${item?.SubCategoryAdoption === 1 && 'txt__status'}  ${item?.SubCategoryAdoption === 0 && 'txt_shipped'} `} >
                                                        {item?.SubCategoryAdoption === 1 ?
                                                            isLang === 'ar' ? ' نشـــط' : 'Active'
                                                            :
                                                            isLang === 'ar' ? '  غير  نشــط' : 'InActive'
                                                        }
                                                    </span>
                                                </div>
                                            </td>


                                            <td>
                                                <div>

                                                    <span>
                                                        <DropdownButton
                                                            id={`dropdown-${item.IDAnimalSubCategory}`}
                                                            title={translateSubCategories[isLang].ActionsLabel}
                                                            variant="outline-success"
                                                            onSelect={(eventKey) => handleActionSelect(item.IDAnimalSubCategory, eventKey)}
                                                            className="DropdownButton "
                                                            drop={'down-centered'}
                                                        >
                                                            <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/adoptionsSubcategories/editsubcategories/${item.IDAnimalSubCategory}`}>
                                                                {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                                                            </Dropdown.Item>

                                                            <div className="w-100 bg-dark opacity-25" style={{ height: '1px' }}></div>




                                                            {
                                                                item?.SubCategoryAdoption === 1 ? '' : item?.SubCategoryAdoption === "1" ? '' : <Dropdown.Item eventKey="AllowAdoption">
                                                                    {
                                                                        isLang === 'ar' ? ' نشـــط' : 'Active'
                                                                    }
                                                                </Dropdown.Item>
                                                            }
                                                            {
                                                                item?.SubCategoryAdoption === 0 ? '' : item?.SubCategoryAdoption === "0" ? '' : <Dropdown.Item eventKey="NotAllowAdoption">
                                                                    {
                                                                        isLang === 'ar' ? '  غير  نشــط' : 'InActive'

                                                                    }
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
            <div className="pagination " dir="ltr">
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

export default AdoptionsAnimals
