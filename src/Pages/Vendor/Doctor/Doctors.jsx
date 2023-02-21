import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { BiX } from 'react-icons/bi';
import ItemDoctor from './ItemDoctor';
import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { Pagination } from 'antd';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import './Doctor.scss'

import $ from 'jquery'
import { Container, Table } from 'react-bootstrap';

export default function Doctors({ getTokenDoctors, fetchDoctors, pagesCountDoctors, countDoctors, setCountDoctors, setSearchKeyDoctors, loadingDoctors }) {


  const token = localStorage.getItem('userToken');

  const [valueSearch, setValueSearch] = useState('')

  const handelSearch = () => {
    setSearchKeyDoctors(valueSearch);
    setCountDoctors(1);
  }


  const handelClickSearch = (e) => {
    if (e.keyCode === 13) {
      // console.log('enter key pressed');
      handelSearch();
    }
  }
  useEffect(() => {
    $('html , body').animate({ scrollTop: 0 }, 200);
  }, []);

  return (
    <>

      {/* <div className="topbar">
        <div className="toggle-topbar" onClick={() => {
          toggleOpen();
          widthBody();
        }}>
          <FaBars />
        </div>
        <div className="search-topbar sales-page">
          <div className="group">
            <input type="search"
              value={localStorage.getItem('searchDoctors') ? localStorage.getItem('searchDoctors') : ''}
              onChange={(e) => {
                localStorage.setItem('searchDoctors', e.target.value);
                setValueSearch(e.target.value);
              }}
              placeholder='Search by Name / Email / Mobile..' style={{ fontSize: '14px' }}
              onKeyDown={handelClickSearch}
            />
            <BiX className='bxx' style={{ cursor: 'pointer', right: '50px' }} onClick={() => {
              localStorage.removeItem('searchDoctors');
              $('.sales-page .group input').val('');
            }} />
            <BsSearch className='bSearch' style={{ cursor: 'pointer', backgroundColor: 'var(--mainColor' }} onClick={handelSearch} />
          </div>
        </div>
        <div className="user-img">
          <img src={userImg2} alt="user" />
        </div>
      </div>   */}
      <Container fluid> 
        <section className='   app__doctor  position-relative'> 
          <div className="app__Users ">
            <Component.ButtonBase title={"Add new user"} bg={"primary"} icon={<Icons.add />} path="/doctors/addDoctor" />
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

                type="text" placeholder="Search by name or email or phone....." name="search" />
              <button type="submit" onClick={() => {
                localStorage.removeItem('searchDoctors');

                //  $('.sales-page .group input').val('');
              }}>
                <Icons.Search onClick={handelSearch} color='#fff' size={25} />
              </button>
            </div>
          </div>
  
          {loadingDoctors ?
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
            :
            <div className="total-table">

              {Object.keys(fetchDoctors).length > 0 ?
                <>
                  <div className="pagi text-center mb-4">
                    <Pagination
                      total={pagesCountDoctors}
                      pageSize={1}
                      showLessItems={true}
                      itemRender={(page, type) => {
                        if (type === 'next') {
                          return <span>{'>>'}</span>
                        }
                        else if (type === 'prev') {
                          return <span>{'<<'}</span>
                        }
                        else if (type === 'page') {
                          return <span>{page}</span>
                        }
                      }}
                      current={countDoctors}
                      onChange={(page) => {
                        setCountDoctors(page);

                      }}

                    />
                  </div>
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
                            item={item}
                            getTokenDoctors={getTokenDoctors}
                          />
                        ))
                        }
                      </tbody>
                    </Table>
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

