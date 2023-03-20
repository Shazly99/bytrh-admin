import React from 'react';
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Component from '../../../constants/Component';
import Icons from '../../../constants/Icons';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { apiheader, GetData, PostData } from './../../../utils/fetchData';

const Bagging = () => {
  const [animal, setAnimal] = useState(null)
  const [isLoader, setIsloader] = useState(false);
  let { SkeletonTable, SkeletonFilters } = useSkeletonTable();

  const baggings = async () => {
    await PostData(`${process.env.REACT_APP_API_URL}/admin/baggings`, {}, apiheader).then(({ data }) => {
      setAnimal(data.Response)
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 200);
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
    baggings()
    window.scrollTo(0, 0);
  }, [])
  // useEffect(() => {
  // }, [page, PagesNumber])

  return (
    <>

      <div className="app__Users ">
        {isLoader ? <>
          <Component.ButtonBase title={"Add    "} bg={"primary"} icon={<Icons.Add   size={21} color={'#ffffffb4'} />} path="/animals/bagging/Add  bagging" />
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
                  <th>Bagging Name</th>
                  <th>Bagging Status</th>
                  <th>Action</th>
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
                            {item?.BaggingActive === 1 ? 'Active' : "InActive"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div>

                          <span>
                            <DropdownButton
                              id={`dropdown-${item.IDBagging}`}
                              title="Actions"
                              variant="outline-success"
                              onSelect={(eventKey) => handleActionSelect(item.IDBagging, eventKey)}
                              className="DropdownButton "
                              drop={'down-centered'}
                            >
                              <Dropdown.Item eventKey="Edite" as={Link} to={`/animals/bagging/editbagging/${item.IDBagging}`}>
                                Edit
                              </Dropdown.Item>

                              {
                                item?.BaggingActive === 1 ? '' : item?.BaggingActive === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                              }
                              {
                                item?.BaggingActive === 0 ? '' : item?.BaggingActive === "INACTIVE" ? '' : <Dropdown.Item eventKey="INACTIVE">InActive</Dropdown.Item>
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