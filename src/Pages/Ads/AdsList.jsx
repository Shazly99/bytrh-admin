import React, { useEffect, useState } from 'react'
import { Table, DropdownButton, Dropdown, NavDropdown } from "react-bootstrap";
import { GetData, PostData, apiheader } from '../../utils/fetchData';
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Component from '../../constants/Component';
import Icons from '../../constants/Icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Img from '../../assets/Img';
import axios from 'axios';
import _ from 'lodash';

 
const AdsList = () => {

  const [ads, setAds] = useState(null)
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const advertisements = _.debounce(async () => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/advertisements`, { IDPage: page }, apiheader).then((res) => {
        if (res.status === 200 && res.request.readyState === 4) {
          console.log(res);
          setAds(res.data.Response.Advertisements);
          setPagesNumber(res.data.Response.Pages);
          setIsLoading(false);

        }
      })
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          advertisements();
        }, (retryAfter || 30) * 1000);
      }
    }
    setIsLoading(false);
  }, 1000);

  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleActionSelect = async (id, action) => {
    console.log(id);
    console.log(action);
    if (action === "DELETE") {
      console.log(id);
      await GetData(`${process.env.REACT_APP_API_URL}/admin/advertisements/status/${id}`, apiheader).then((res) => {
        toast.success('The ads has been removed', {
          duration: 4000,
          position: 'top-center',
          icon: <Icons.bin color='#E20000' size={20} />,
          iconTheme: {
            primary: '#0a0',
            secondary: '#fff',
          },
        });
      })
      await advertisements()
    }
  };

  useEffect(() => {
    advertisements();
  }, [page]);

  return (
    <>
      {
        ads ?
          <>

            <div className="app__Users ">
              <Component.ButtonBase title={"Add "} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'}  />} path="/ads/add" />
              <div className="app__Users-table">
                {/* <div className="search-container">
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
          </div> */}
  
                <Table responsive={true} className='rounded-3 '>
                  <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                      <th> Image</th>
                      <th> Service</th>
                      <th>Start-Date</th>
                      <th> End-Date  </th>
                      <th> Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className='text-center'>
                    {
                      ads?.map((item, index) => (
                        <tr key={index}>
                          <td className='img'>
                            {
                              item?.AdvertisementImage ?
                                <LazyLoadImage
                                  src={item.AdvertisementImage} // use normal <img> attributes as props
                                  className="w-100 rounded-2"
                                  effect="blur"
                                /> :

                                <LazyLoadImage
                                  src={Img.ads} // use normal <img> attributes as props
                                  className="w-100 rounded-2"
                                  effect="blur"
                                />

                            }
                            {/* <img src={item.AdvertisementImage} alt='example' className='w-100 rounded-2' /> */}
                          </td>
                          <td >
                            <div>
                              {item?.AdvertisementService.charAt(0).toUpperCase() + item?.AdvertisementService.slice(1).toLowerCase()}
                            </div>
                          </td>
                          <td >
                            <div>
                              {item?.AdvertisementStartDate?.split(" ")[0]}
                            </div>
                          </td>
                          <td >
                            <div>
                              {item?.AdvertisementEndDate?.split(" ")[0]}
                            </div>
                          </td>
                          <td >
                            <div>
                              {item?.AdvertisementLocation.charAt(0).toUpperCase() + item?.AdvertisementLocation.slice(1).toLowerCase()}
                            </div>
                          </td>



                          <td>
                            <div>
                              <span>
                                <DropdownButton
                                  id={`dropdown-${item.IDAdvertisement}`}
                                  title="Actions"
                                  variant="outline-success"
                                  onSelect={(eventKey) => handleActionSelect(item.IDAdvertisement, eventKey)}
                                  className="DropdownButton "
                                  drop={'down-centered'}
                                >
                                  <Dropdown.Item eventKey="Edite" as={Link} to={`/ads/edit/${item.IDAdvertisement}`}>
                                    Edit
                                  </Dropdown.Item>

                                  <Dropdown.Item eventKey="DELETE"   >
                                    Delete
                                  </Dropdown.Item>

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

export default AdsList