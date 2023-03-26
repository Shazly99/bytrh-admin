import React from 'react'
import { Table, DropdownButton, Dropdown } from "react-bootstrap";

import Component from '../../../constants/Component'
import Icons from '../../../constants/Icons'
import { GetData, PostData, apiheader } from './../../../utils/fetchData';
import { useEffect , useContext } from 'react';
import { useState } from 'react';
// import { Pagination } from "@mui/material";
// import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { VendersContext } from "../../../context/Store";
import translateCutting from './translateCutting';


const AnimalsCutting = () => {
  const [animal, setAnimal] = useState(null)
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

  // get cuttings
  const cuttings = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/cuttings`, {}, apiheader).then(({ data }) => {
      setAnimal(data.Response)
      // setPagesNumber(data.Response.Pages);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          cuttings();
        }, (retryAfter || 60) * 1000);
      }
    })
  }


  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE") {
      await cuttingsStatus(id).then((res) => {
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
      await cuttings()
    } else if (action === "INACTIVE") {
      await cuttingsStatus(id).then((res) => {
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
      await cuttings()
    }
  };
  const cuttingsStatus = async (id) => {
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/cuttings/status/${id}`, apiheader)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    cuttings()
  }, [])


  let { isLang } = useContext(VendersContext);


  return (
    <>
 
        <div className="app__Users ">
          {isLoader ? <>
            <Component.ButtonBase title={translateCutting[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/animals/cutting/addcutting" />
          </> :
            <div className="mt-3 p-2">
              {SkeletonFilters(40, 150)}
            </div>
          }
          <div className="app__Users-table"> 
            {isLoader ? <>
              <Table responsive={true} className='rounded-3 '>
                <thead>
                  <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                    {translateCutting[isLang]?.TableHeader?.map((el , i) => (
                        <th key={i}>{el}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    animal?.map((item, index) => (
                      <tr key={index}>


                        <td >
                          <div>
                            {item?.CuttingName}
                          </div>
                        </td>

                        <td >
                          <div>
                            <span style={{ height: 'fit-content !important' }} className={`  ${item?.CuttingActive === 1 && 'txt_delivered'}  ${item?.CuttingActive === 0 && 'txt_rejected'} `} >
                              {item?.CuttingActive === 1 ? 'Active' : "InActive"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div>

                            <span>
                              <DropdownButton
                                id={`dropdown-${item.IDCutting}`}
                                title={translateCutting[isLang].ActionsLabel}
                                variant="outline-success"
                                onSelect={(eventKey) => handleActionSelect(item.IDCutting, eventKey)}
                                className="DropdownButton "
                                drop={'down-centered'}
                              >
                                <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/cutting/editcutting/${item.IDCutting}`}>
                                  {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                                </Dropdown.Item>

                                {
                                  item?.CuttingActive === 1 ? '' : item?.CuttingActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">
                                    {isLang === 'ar' ? 'نشـط' : 'Active'}
                                  </Dropdown.Item>
                                }
                                {
                                  item?.CuttingActive === 0 ? '' : item?.CuttingActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">
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
            </> :
              SkeletonTable()
            }
          </div>

        </div>
=======

      <div className="app__Users ">
        {isLoader ? <>
          <Component.ButtonBase title={"Add  "} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/animals/cutting/addcutting" />
        </> :
          <div className="mt-3 p-2">
            {SkeletonFilters(40, 150)}
          </div>
        }
        <div className="app__Users-table">
          {isLoader ? <>
            <Table responsive={true} className='rounded-3 '>
              <thead>
                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  <th>Cutting Name</th>
                  <th>Cutting Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {
                  animal?.map((item, index) => (
                    <tr key={index}>


                      <td >
                        <div>
                          {item?.CuttingName}
                        </div>
                      </td>

                      <td >
                        <div>
                          <span style={{ height: 'fit-content !important' }} className={`  ${item?.CuttingActive === 1 && 'txt_delivered'}  ${item?.CuttingActive === 0 && 'txt_rejected'} `} >
                            {item?.CuttingActive === 1 ? 'Active' : "InActive"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div>

                          <span>
                            <DropdownButton
                              id={`dropdown-${item.IDCutting}`}
                              title="Actions"
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDCutting, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/cutting/editcutting/${item.IDCutting}`}>
                                Edit
                              </Dropdown.Item>

                              {
                                item?.CuttingActive === 1 ? '' : item?.CuttingActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                              }
                              {
                                item?.CuttingActive === 0 ? '' : item?.CuttingActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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
          </> :
            SkeletonTable()
          }
        </div>

      </div>
 
    </>
  )
}

export default AnimalsCutting
