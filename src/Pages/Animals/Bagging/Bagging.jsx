import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, NavDropdown, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import { VendersContext } from "../../../context/Store";
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { GetData, PostData, apiheader } from './../../../utils/fetchData';
import translateBagging from './translateBagging';


const Bagging = () => {
  let { isLang } = useContext(VendersContext);
  const [animal, setAnimal] = useState(null)
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

  const baggings = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings`, {}, apiheader).then(({ data }) => {
      setAnimal(data.Response)
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    }).catch((error) => {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        setTimeout(() => {
          baggings();
        }, (retryAfter || 60) * 1000);
      }
    })
  }

  const handleActionSelect = async (id, action) => {
    if (action === "ACTIVE" || action === "INACTIVE") {
      await baggingsStatus(id).then((res) => {
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
      await baggings()
    }
  };
  const baggingsStatus = async (id) => {
    return await GetData(`${process.env.REACT_APP_API_URL}/admin/baggings/status/${id}`, apiheader)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      baggings()
      window.scrollTo(0, 0);
    }, 200);
    return () => clearTimeout(timeoutId);

  }, [ isLang])
  // useEffect(() => {
  // }, [page, PagesNumber])


 


  return (
    <>

      <div className="app__Users ">
        <div className="app__Users-table">
        {/* {isLoader ? <> */}
          <Component.ButtonBase title={translateBagging[isLang]?.addBTN} bg={"primary"} icon={<Icons.Add size={21} color={'#ffffffb4'} />} path="/animals/bagging/addbagging" />
        {/* </> :
          <div className="mt-3 p-2">
            {SkeletonFilters(40, 150)}
          </div>
        } */}
          {isLoader ? <>
            <Table responsive={true} className='rounded-3 '>
              <thead>
                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  {translateBagging[isLang]?.TableHeader?.map((el , i) => (
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
                          {item?.BaggingName}
                        </div>
                      </td>

                      <td >
                        <div>
                          <span style={{ height: 'fit-content !important' }} className={`  ${item?.BaggingActive === 1 && 'txt_delivered'}  ${item?.BaggingActive === 0 && 'txt_rejected'} `} >
                            {item?.BaggingActive === 1 ? 
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
                              id={`dropdown-${item.IDBagging}`}
                              title={translateBagging[isLang].ActionsLabel}
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDBagging, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/bagging/editbagging/${item.IDBagging}`}>
                                {isLang === 'ar' ? 'تعديـل' : 'Edit'}
                              </Dropdown.Item>
                              <NavDropdown.Divider />

                              {
                                item?.BaggingActive === 1 ? '' : item?.BaggingActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">
                                    {isLang === 'ar' ? 'نشـط' : 'Active'}
                                </Dropdown.Item>
                              }
                              {
                                item?.BaggingActive === 0 ? '' : item?.BaggingActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">
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

    </>
  )
}

export default Bagging