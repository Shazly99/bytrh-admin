import React, { useState } from 'react';
import ItemDoctor from './ItemDoctor';
import { useEffect } from 'react';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import './Doctor.scss'
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import $ from 'jquery'
import { Container, Table } from 'react-bootstrap';
import Loader from '../../../Components/Shared/Loader/Loader';
import axios from 'axios';
import { apiheader } from '../../../utils/fetchData';


export default function Doctors() {


  // const token = localStorage.getItem('userToken');
  const URL_Doctors = `https://bytrh.com/api/admin/doctors`;

  const [pagesCountDoctors, setPagesCountDoctors] = useState(0);
  const [countDoctors, setCountDoctors] = useState(1);
  const [searchKeyDoctors, setSearchKeyDoctors] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false)
  const [fetchDoctors, setFetchDoctors] = useState([])
  async function getTokenDoctors() {

    setLoadingDoctors(true);
    await axios.post(URL_Doctors, {
      IDPage: countDoctors,
      // SearchKey: searchKeyDoctors
    }, apiheader)
    .then(res => {
      setFetchDoctors(res.data.Response.Doctors);
      setPagesCountDoctors(res.data.Response.Pages);
      setLoadingDoctors(false);
    })
      .catch((error) => {
        console.log(error);
    });
  }
  useEffect(() => {
      getTokenDoctors();
  }, [countDoctors]);




  useEffect(() => {
    $('html , body').animate({ scrollTop: 0 }, 200);
  }, [countDoctors]);

  useEffect(() => {
    if(loadingDoctors) {
      $('body').addClass('d-none');
      $('body').removeClass('d-block')
    }
    $('body').addClass('d-block');
    $('body').removeClass('d-none')
  }, [loadingDoctors]);


  const handleChange = (event, value) => {
    setCountDoctors(value); 
  };

  const [valueSearch, setValueSearch] = useState('')

  const handelSearch = () => {
    setSearchKeyDoctors(valueSearch);
    setCountDoctors(1);
  }

  const handelClickSearch = (e) => {
    if (e.keyCode === 13) {
      handelSearch();
    }
  }



    // filter
    const [selectedOption, setSelectedOption] = useState('All');

    const handleOptionChange = async (e) => {
      const selectedValue = e.target.value;
      setSelectedOption(selectedValue);

      // filter your content based on the selected option 
      if (selectedValue === "ACTIVE" || selectedValue === "INACTIVE" || selectedValue === "BLOCKED" || selectedValue === "OFFLINE") {
          setLoadingDoctors(true);
            await axios.post(URL_Doctors, {
              // IDPage: countDoctors,
              // SearchKey: searchKeyDoctors,
              DoctorStatus: selectedValue,
            }, apiheader)
              .then(res => {
                setFetchDoctors(res.data.Response.Doctors);
                setPagesCountDoctors(res.data.Response.Pages);
                setLoadingDoctors(false);
            })
              .catch((error) => {
                console.log(error);
            });
      }  else if (selectedValue === "All") {
            getTokenDoctors();
      }
    };




    useEffect(() => {
      setCountDoctors(1);
      setLoadingDoctors(true);
      axios.post(URL_Doctors, {
        IDPage: 1,
        SearchKey: searchKeyDoctors,
        DoctorStatus: selectedOption !== "All" ? selectedOption : null,
      }, apiheader)
      .then(res => {
        setFetchDoctors(res.data.Response.Doctors);
        setPagesCountDoctors(res.data.Response.Pages);
        setLoadingDoctors(false);
      })
        .catch((error) => {
          console.log(error);
      });
    }, [searchKeyDoctors , selectedOption]);







  return (
    <>

      <Container fluid>
        <section className='   app__doctor  position-relative'>
          <div className="app__Users ">
            <Component.ButtonBase title={"Add"} bg={"primary"} icon={<Icons.add size={21} color={'#ffffffb4'} />} path="/doctors/addDoctor" />
          </div>

          <div className="search-container">
            <div className='search__group'>
              <input
                value={localStorage.getItem('searchDoctors') ? localStorage.getItem('searchDoctors') : ''}
                onChange={(e) => {
                  localStorage.setItem('searchDoctors', e.target.value);
                  setValueSearch(e.target.value);
                }}
                onKeyDown={handelClickSearch}

                type="text" placeholder="Search by name or phone.." name="search" />
              <button type="submit" onClick={() => {
                localStorage.removeItem('searchDoctors');

              }}>
                <Icons.Search onClick={handelSearch} color='#fff' size={25} />
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

              <label>
                <input
                  type="radio"
                  name="filter"
                  value="BLOCKED"
                  checked={selectedOption === "BLOCKED"}
                  onChange={handleOptionChange}
                  className="inactive-radio form-check-input"

                /> 
                Blocked
              </label>

              <label>
                <input
                  type="radio"
                  name="filter"
                  value="OFFLINE"
                  checked={selectedOption === "OFFLINE"}
                  onChange={handleOptionChange}
                  className="inactive-radio form-check-input"

                /> 
                Offline
              </label>
            </div>
          </div>

          


          {loadingDoctors ?
            <Loader /> 

            :

            <div className="total-table">

              {Object.keys(fetchDoctors).length > 0 ?
                <> 
                  <div className="app__Users-table  ">
                    <Table responsive={true} className='rounded-3 '>
                      <thead className="table-light bg-input">
                        <tr>
                          <th scope="col">Name</th>
                          {/* <th scope="col">Email</th> */}
                          {/* <th scope="col">Mobile</th> */}
                          <th scope="col">Country</th>
                          <th scope="col">Type</th>
                          <th scope="col">Balance</th>
                          <th scope="col">Status</th>
                          <th scope="col">Register Date</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchDoctors.map((item, i) => (
                          <ItemDoctor
                            key={i}
                            id={item.IDDoctor}
                            nameDoc={item.DoctorName}
                            email={item.DoctorEmail}
                            phone={item.DoctorPhone}
                            country={item.CountryNameEn}
                            type={item.DoctorType}
                            balance={item.DoctorBalance}
                            status={item.DoctorStatus}
                            create={item.CreateDate}
                            item={item}
                            getTokenDoctors={getTokenDoctors}
                          />
                        ))
                        }
                      </tbody>
                    </Table>
                  </div>

                  <div className="pagination mt-2">
                    <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                      <Pagination count={pagesCountDoctors} page={countDoctors} onChange={handleChange}  />
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

