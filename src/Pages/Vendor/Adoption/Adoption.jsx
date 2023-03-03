import React, { useState } from 'react';
import ItemAdoption from '../Adoption/ItemAdoption';
import { useEffect } from 'react';
// import { Pagination } from 'antd';
// import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
// import '../Doctor/Doctor.scss'
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import $ from 'jquery'
import { Container, Table } from 'react-bootstrap';
import Loader from '../../../Components/Shared/Loader/Loader';
import axios from 'axios';
import { apiheader } from '../../../utils/fetchData';



export default function Adoption() {


  // const token = localStorage.getItem('userToken');
  const URL_Adoption = `https://bytrh.com/api/admin/adoptions`;

  const [pagesCountAdoption, setPagesCountAdoption] = useState(0);
  const [countAdoption, setCountAdoption] = useState(1);
  const [searchKeyAdoption, setSearchKeyAdoption] = useState(null);
  const [loadingAdoption, setLoadingAdoption] = useState(false)
  const [fetchAdoption, setFetchAdoption] = useState([])
  async function getTokenAdoption() {

    setLoadingAdoption(true);
    await axios.post(URL_Adoption, {
      IDPage: countAdoption,
      SearchKey: searchKeyAdoption
    }, apiheader)
      .then(res => {
        setFetchAdoption(res.data.Response.Adoptions);
        setPagesCountAdoption(res.data.Response.Pages);
        setLoadingAdoption(false);
      })
      .catch((error) => {
        console.log(error)
      });
  }
  useEffect(() => {
      getTokenAdoption();
  }, [countAdoption, pagesCountAdoption, searchKeyAdoption]);


  useEffect(() => {
    $('html , body').animate({ scrollTop: 0 }, 200);
  }, [countAdoption]);

  useEffect(() => {
    if(loadingAdoption) {
      $('body').addClass('d-none');
      $('body').removeClass('d-block')
    }
    $('body').addClass('d-block');
    $('body').removeClass('d-none')
  }, [loadingAdoption]);


  const handleChange = (event, value) => {
    setCountAdoption(value); 
  };

  const [valueSearch, setValueSearch] = useState('')

  const handelSearch = () => {
    setSearchKeyAdoption(valueSearch);
    setCountAdoption(1);
  }

  const handelClickSearch = (e) => {
    if (e.keyCode === 13) {
      handelSearch();
    }
  }



  return (
    <>

      <Container fluid>
        <section className='   app__doctor  position-relative'>
          {/* <div className="app__Users ">
            <Component.ButtonBase title={"Add New Doctor"} bg={"primary"} icon={<Icons.add />} path="/doctors/addDoctor" />
          </div> */}
          <div className="search-container my-4">
            <div className='search__group'>
              <input
                value={localStorage.getItem('searchAdoption') ? localStorage.getItem('searchAdoption') : ''}
                onChange={(e) => {
                  localStorage.setItem('searchAdoption', e.target.value);
                  setValueSearch(e.target.value);
                }}
                onKeyDown={handelClickSearch}

                type="text" placeholder="Search by client name.." name="search" />
              <button type="submit" onClick={() => {
                localStorage.removeItem('searchAdoption');

                //  $('.sales-page .group input').val('');
              }}>
                <Icons.Search onClick={handelSearch} color='#fff' size={25} />
              </button>
            </div>
          </div>

          {loadingAdoption ?
            <Loader /> 

            :

            <div className="total-table">

              {Object.keys(fetchAdoption).length > 0 ?
                <> 
                  <div className="app__Users-table  ">
                    <Table responsive={true} className='rounded-3 '>
                      <thead className="table-light bg-input">
                        <tr>
                          <th scope="col">Pet Image</th>
                          <th scope="col">Pet Name</th>
                          <th scope="col">Pet Strain</th>
                          <th scope="col">Category</th>
                          <th scope="col">City</th>
                          <th scope="col">Client Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchAdoption.map((item, i) => (
                          <ItemAdoption
                            key={i}
                            id={item.IDAdoption}
                            clientName={item.ClientName}
                            petName={item.PetName}
                            petStrain={item.DoctorPetStrain}
                            petPicture={item.PetPicture}
                            cityName={item.CityName}
                            cate={item.AnimalSubCategoryName}
                            status={item.AdoptionStatus}
                            getTokenAdoption={getTokenAdoption}
                          />
                        ))
                        }
                      </tbody>
                    </Table>
                  </div>

                  <div className="pagination mt-2">
                    <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                      <Pagination count={pagesCountAdoption} page={countAdoption} onChange={handleChange}  />
                    </Box>
                  </div>
                </>
                :
                <h2 className='text-center mt-fixed py-4'>Your Table is Empty..</h2>
              }
            </div>
          }

        </section>
      </Container>
    </>
  )
}


