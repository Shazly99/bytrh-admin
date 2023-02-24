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


const Country = () => {
    const [country, setCountry] = useState(null)
    const [page, setPage] = useState(1);
    const [PagesNumber, setPagesNumber] = useState('')

    const CountrycList = async () => {
        await PostData(`${process.env.REACT_APP_API_URL}/admin/location/countries`, { IDPage: page }, apiheader).then(({ data }) => {
            setCountry(data.Response.Countries)
            console.log(data);
            setPagesNumber(data.Response.Pages);
        }).then((error) => {

            /*         if (error.response && error.response.status === 429) {
                        const retryAfter = error.response.headers['retry-after'];
                        setTimeout(() => {
                            CountrycList();
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
            await CountrycategoriesStatus(id).then((res) => {
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
            await CountrycList()
        } else if (action === "INACTIVE") {
            await CountrycategoriesStatus(id).then((res) => {
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
            await CountrycList()

        }
    };
    const CountrycategoriesStatus = async (id) => {
        return await GetData(`${process.env.REACT_APP_API_URL}/admin/location/countries/status/${id}`, apiheader)
    }
    useEffect(() => {
        CountrycList()
    }, [])
    return (
        <>
            <div className="app__Users ">
                <Component.ButtonBase title={"Add New Country"} bg={"primary"} icon={<Icons.add />} path="/location/country/addcountry" />
                <div className="app__Users-table">

                    <Table responsive={true} className='rounded-3 '>
                        <thead>
                            <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                <th>Country Name</th>
                                <th>Country Time Zone</th>
                                <th>Country Code</th>
                                <th>Country Status</th>
                                <th>Action</th>
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
                                                    {item?.CountryActive === 1 ? 'Active' : "InActive"}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div>
                                                <span>
                                                    <DropdownButton
                                                        id={`dropdown-${item.IDCountry}`}
                                                        title="Actions"
                                                        variant="outline-success"
                                                        onSelect={(eventKey) => handleActionSelect(item.IDCountry, eventKey)}
                                                        className="DropdownButton "
                                                        drop={'down-centered'}
                                                    >
                                                        <Dropdown.Item eventKey="Edite" as={Link} to={`/location/country/editcountry/${item.IDCountry}`}>
                                                            Edit
                                                        </Dropdown.Item>
                                                        {
                                                            item?.CountryActive === 1 ? '' : item?.UserStatus === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>        
                                                        }
                                                        {
                                                          item?.CountryActive === 0 ? '':  item?.UserStatus === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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

export default Country