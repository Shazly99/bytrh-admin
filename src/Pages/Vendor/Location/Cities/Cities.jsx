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
  useEffect(() => {
    CitiescList()
  }, [])
  return (
    <>

      <div className="app__Users ">
        <Component.ButtonBase title={"Add New City"} bg={"primary"} icon={<Icons.add />} path="/location/cities/addcity" />
        <div className="app__Users-table">

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
    </>
  )
}

export default Cities