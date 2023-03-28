import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, NavDropdown, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../../constants/Component';
import Icons from '../../../../constants/Icons';
import { VendersContext } from "../../../../context/Store";
import { apiheader, GetData, PostData } from '../../../../utils/fetchData';
import useSkeletonTable from "../../../../utils/useSkeletonTable";
import initialTranslation from "./Translation";


const Country = () => {
    let { isLang } = useContext(VendersContext);
    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)

    const [country, setCountry] = useState(null)
    const [page, setPage] = useState(1);
    const [PagesNumber, setPagesNumber] = useState('')
    const [searchValue, setSearchValue] = useState('');
    const [isLoader, setIsloader] = useState(false);
    let { SkeletonTable, SkeletonSearch, SkeletonFilters } = useSkeletonTable();
    const CountrycList = async (page) => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/location/countries`, { IDPage: page }, apiheader).then(({ data }) => {
            setCountry(data.Response.Countries)
            setPagesNumber(data.Response.Pages);
            const timeoutId = setTimeout(() => {
                setIsloader(true)
            }, 0);
            return () => clearTimeout(timeoutId);
        }).catch((error) => {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                setTimeout(() => {
                    CountrycList();
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
            await CountrycategoriesStatus(id).then((res) => {
                toast.success(<strong>{translate[isLang].toast.update}</strong>, {
                    duration: 4000,
                    position: 'bottom-center',
                    // icon: <Icons.UploadItem color='#3182CE' size={20} />,
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await CountrycList()
        }
    };
    const CountrycategoriesStatus = async (id) => {
        return await GetData(`${process.env.REACT_APP_API_URL}/admin/location/countries/status/${id}`, apiheader)
    }

    // search and filter 

    const handleSearchClick = () => {
        searchGetData(searchValue)
    };

    const handleInputChange = (event) => {
        if (event.target.value === '') {
            CountrycList(page)
        }
        setSearchValue(event.target.value);
    };

    const searchGetData = async (searchValue) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/location/countries`, { IDPage: page, SearchKey: searchValue }, apiheader)
        setCountry(data.Response.Countries)
    }
    // filter
    const [selectedOption, setSelectedOption] = useState('All');

    const handleOptionChange = async (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        // filter your content based on the selected option 
        if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE") {
            let { data } = await PostData(`https://bytrh.com/api/admin/location/countries`, { IDPage: page, CountryStatus: selectedValue }, apiheader)
            setCountry(data.Response.Countries)
            setPagesNumber(data.Response.Pages);
        } else if (selectedValue === "All") {
            CountrycList()
        }
    };

    useEffect(() => {
        CountrycList(page)
        window.scrollTo(0, 0);
        handelTranslate()
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
                                <Component.ButtonBase title={translate[isLang].add.btn} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/location/country/addcountry" />
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
                                    <React.Fragment key={index} >
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
                                    </React.Fragment>
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
                                    country?.map((item, index) => (
                                        <tr key={index}>
                                            <td >
                                                <div>
                                                    {item?.CountryName}
                                                </div>
                                            </td>

                                            <td >
                                                <div>
                                                    {item?.CountryCode}
                                                </div>
                                            </td>
                                            <td >
                                                <div>
                                                    {item?.CountryTimeZone}
                                                </div>
                                            </td>

                                            <td >
                                                <div>
                                                    <span style={{ height: 'fit-content !important' }} className={`  ${item?.CountryActive === 1 && 'txt_delivered'}  ${item?.CountryActive === 0 && 'txt_rejected'} `} >
                                                        {
                                                            translate[isLang].FilterStatus?.filter((itemfilter) => itemfilter.CountryActive === item?.CountryActive)
                                                                .map((status, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {item?.CountryActive === status.CountryActive ? status.text : ''}
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
                                                            id={`dropdown-${item.IDCountry}`}
                                                            title={translate[isLang]?.Actions.action}
                                                            variant="outline-success"
                                                            onSelect={(eventKey) => handleActionSelect(item.IDCountry, eventKey)}
                                                            className="DropdownButton "
                                                            drop={'down-centered'}
                                                        >
                                                            <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="Edite" as={Link} to={`/location/country/editcountry/${item.IDCountry}`}>
                                                                {translate[isLang]?.Actions.edit}
                                                            </Dropdown.Item>
                                                            <NavDropdown.Divider />

                                                            {
                                                                translate[isLang].FilterStatus?.filter?.((item) => item.value !== "All").map((status, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {item?.CountryActive === status.CountryActive ? '' : item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>}
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

export default Country