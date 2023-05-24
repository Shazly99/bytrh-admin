import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownButton, Form, NavDropdown, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast';
import Component from '../../../constants/Component.js';
import { VendersContext } from '../../../context/Store.js';
import { GetData, PostData, apiheader } from '../../../utils/fetchData.js';
import useSkeletonTable from '../../../utils/useSkeletonTable.js';
import './Client.scss';
const ClientTable = ({ usersList, userList, isLoading, actionsTranslate, toastTranslate, currency, statusTranslate, tabelTranslate }) => {
  let { SkeletonTable } = useSkeletonTable();
  let { isLang } = useContext(VendersContext);

  const [id, setId] = useState(null);

  const [showModalInc, setShowModalInc] = useState(false);
  const handleShowModalInc = () => setShowModalInc(true);
  const handleCloseModalInc = () => setShowModalInc(false);

  const [showModalDec, setShowModalDec] = useState(false);
  const handleShowModalDec = () => setShowModalDec(true);
  const handleCloseModalDec = () => setShowModalDec(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState({});
  let changeBalance = useRef()
  const [messageBalance, setMessageBalance] = useState('');
  const [balance, setBalance] = useState();


  // !change client status
  
  const handleActionSelect = async (id, action) => {
    if (action === "BLOCKED" || action === "ACTIVE" || action === "INACTIVE") {
      await userstatus({ IDClient: id, ClientStatus: action }).then((res) => {
        toast.success(<strong>{toastTranslate.update}</strong>, {
          duration: 4000,
          position: 'bottom-center',
          // icon: <Icons.UploadItem color='#3182CE' size={20} />,
          iconTheme: {
            primary: '#3182CE',
            secondary: '#fff',
          },
        });
      })
      await userList()
    } else if (action === "DELETED") {
      setSelectedUserId({ IDClient: id, ClientStatus: action });
      setShowDeleteModal(true);
    } else if (action === "reset") {
      await resetPassword(id)
      await userList()
    } else if (action === "addBalance" || action === 'loseBalance') {
      setId(id)
    }
  };
  const userstatus = async (status) => {
    return await PostData(`https://bytrh.com/api/admin/clients/status`, status, apiheader)
  }

  // const changeWallet = async () => {
  //   await PostData(`https://bytrh.com/api/admin/clients/wallet/add`, { 
  //     IDClient: id, 
  //     Amount: changeBalance.current.value 
  //   }, apiheader).then((res) => {
  //     if (res.data.Success === true) {
  //       toast.success(<strong>{toastTranslate.wallet}</strong>, {
  //         duration: 4000,
  //         position: 'bottom-center',
  //         iconTheme: {
  //           primary: '#0a0',
  //           secondary: '#fff',
  //         },
  //       });
  //       userList()
  //       handleCloseModal()
  //     } else {
  //       toast.error(res.data.ApiMsg)
  //     }
  //   })
  // }

  const changeWallet = async (el) => {
    if(changeBalance.current.value < 0) {
        if(isLang === 'ar') {
            setMessageBalance('غير مسموح بإضافة قيمة سالبة..')
        }
        else {
            setMessageBalance("It's not allowed to add a negative value..")
        }
    }
    if((balance - changeBalance.current.value) < 0 && el === 'lose') {
      if(isLang === 'ar') {
          setMessageBalance('غير مسموح ان يصبح الرصيد أقل من صفر (سالب)..')
      }
      else {
          setMessageBalance("It's not allowed to be less than zero (negative)..")
      }
    }
    else {
        await PostData(`https://bytrh.com/api/admin/clients/wallet/add`, { 
            IDClient: id, 
            Amount: el === 'add' ? changeBalance.current.value : -changeBalance.current.value 
        }, apiheader).then((res) => {
            if (res.data.Success === true) {
              toast.success(<strong>{toastTranslate.wallet}</strong>, {
                duration: 4000,
                position: 'top-center',
                iconTheme: {
                  primary: '#0a0',
                  secondary: '#fff',
                },
              });
              userList();
              setMessageBalance('');
              handleCloseModalInc();
              handleCloseModalDec();
            } else {
              toast.error(res.data.ApiMsg)
            }
          })
    }
}

  // client reset Password api Balance
  const resetPassword = async (idClient) => {
    let data = await GetData(`https://bytrh.com/api/admin/clients/password/reset/${idClient}`, apiheader)
    if (data.Success === true) {
      toast.success(<strong>{toastTranslate.reset}</strong>);
    } else {
      toast.error('password reset failed!');

    }
  }

  const handleDeleteUser = async () => {
    // Logic for deleting user with ID `selectedUserId`
    setShowDeleteModal(false);
    await userstatus(selectedUserId).then((res) => {
      toast.success(<strong>{toastTranslate.delete}</strong>, {
        duration: 4000,
        position: 'bottom-center',
        iconTheme: {
          primary: '#E20000',
          secondary: '#fff',
        },
      });
    })
    await userList()
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [usersList])
  return (
    <>
      {isLoading ? <>
        <>
          {
            usersList?.length > 0 ? 
              <Table responsive={true} className='rounded-3 '>
                <thead>
                  <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                    {
                      tabelTranslate?.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    usersList?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                            <span className='ClientName'>{item?.ClientName}</span>
                            <span className='ClientPhone'>{item?.ClientPhone}</span>
                          </div>
                        </td>
                        <td className='text-center'>
                          <div>
                            {item?.CountryName}
                          </div>
                        </td>
                        <td className='text-center'>
                          <div>
                            {
                              item?.LoginBy.split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ')
                            }
                          </div>
                        </td>
                        <td className='text-center'>
                          <div>
                            <h6 className="mb-0  pe-2 bolder">
                              {item?.ClientBalance} {currency}
                            </h6>                    </div>
                        </td>
                        <td className='text-center  d-flex '>
                          <div>
                            <span style={{ height: 'fit-content !important' }} className={` 
                                ${item.ClientStatus === 'ACTIVE' && 'txt_delivered'}
                                ${item.ClientStatus === 'INACTIVE' && 'txt_rejected'}
                                ${item.ClientStatus === 'BLOCKED' && 'txt_blocked'}
                                `}  >
                              {
                                statusTranslate?.filter((itemfilter) => itemfilter.value === item?.ClientStatus)
                                  .map((status, index) => (
                                    <React.Fragment key={index}>
                                      {item?.ClientStatus === status.value ? status.text : ''}
                                    </React.Fragment>
                                  ))
                              }
                            </span>
                          </div>
                        </td>
                        <td >
                          <div>
                            {item?.CreateDate.split(" ")[0]}
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>
                              <DropdownButton
                                id={`dropdown-${item.IDClient}`}
                                title={actionsTranslate[0].name}
                                variant="outline-success"
                                onSelect={(eventKey) => handleActionSelect(item.IDClient, eventKey)}
                                className="DropdownButton "
                              >
                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="reset">{actionsTranslate[1].name}</Dropdown.Item>
                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="addBalance" onClick={() => {
                                  handleShowModalInc();
                                  setBalance(item.ClientBalance);
                                }}>
                                  {/* {actionsTranslate[2].name} */}
                                  {isLang === 'ar' ? 'زيادة التوازن' : 'Increase Balance'}
                                </Dropdown.Item>

                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="loseBalance" onClick={() => {
                                  handleShowModalDec();
                                  setBalance(item.ClientBalance);
                                }}>
                                  {/* {actionsTranslate[2].name} */}
                                  {isLang === 'ar' ? 'تقليل التوازن' : 'Decrease Balance'}
                                </Dropdown.Item>

                                <Modal dir={isLang === "ar" ? "rtl" : "ltr"} show={showModalInc} onHide={() => {
                                    handleCloseModalInc();
                                    setMessageBalance('');
                                }} centered >
                                  <Modal.Header closeButton>
                                    {/* <Modal.Title>{actionsTranslate[2].titleModel} {' '} {item?.ClientName} </Modal.Title> */}
                                    <Modal.Title>{`${isLang === 'ar' ? `زيادة التوازن ل ${item?.ClientName}` : `Increase ${item?.ClientName} Balance`}`}</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form.Control type="number" ref={changeBalance} />
                                  </Modal.Body>
                                  {messageBalance.length > 0 ? <p id="alertBalanse" className={`alert alert-danger fs-6 py-2 my-2 w-75 text-center mx-auto`}>{messageBalance}</p> : ''}
                                  <Modal.Footer className="d-flex justify-content-center align-items-center">
                                    <Button variant="outline-primary" onClick={handleCloseModalInc}>
                                      {actionsTranslate[2].btn2}
                                    </Button>
                                    {/* <Button variant="primary" onClick={changeWallet}>
                                      {actionsTranslate[2].btn1}                              
                                    </Button> */}
                                    <Button variant="primary" onClick={() => {
                                        changeWallet('add');
                                    }}>
                                        {isLang === 'ar' ? 'زيادة التوازن' : 'Increase Balance'}
                                    </Button>
                                  </Modal.Footer>
                                </Modal>

                                <Modal dir={isLang === "ar" ? "rtl" : "ltr"} show={showModalDec} onHide={() => {
                                    handleCloseModalDec();
                                    setMessageBalance('');
                                }} centered >
                                  <Modal.Header closeButton>
                                    {/* <Modal.Title>{actionsTranslate[2].titleModel} {' '} {item?.ClientName} </Modal.Title> */}
                                    <Modal.Title>{`${isLang === 'ar' ? `تقليل التوازن ل ${item?.ClientName}` : `Decrease ${item?.ClientName} Balance`}`}</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form.Control type="number" ref={changeBalance} />
                                  </Modal.Body>
                                  {messageBalance.length > 0 ? <p id="alertBalanse" className={`alert alert-danger fs-6 py-2 my-2 w-75 text-center mx-auto`}>{messageBalance}</p> : ''}
                                  <Modal.Footer className="d-flex justify-content-center align-items-center">
                                    <Button variant="outline-primary" onClick={handleCloseModalDec}>
                                      {actionsTranslate[2].btn2}
                                    </Button>
                                    {/* <Button variant="primary" onClick={changeWallet}>
                                      {actionsTranslate[2].btn1}                              
                                    </Button> */}
                                    <Button variant="primary" onClick={() => {
                                        changeWallet('lose');
                                    }}>
                                        {isLang === 'ar' ? 'تقليل التوازن' : 'Decrease Balance'}
                                    </Button>
                                  </Modal.Footer>
                                </Modal>

                                <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey="DELETED">{actionsTranslate[3].name}</Dropdown.Item>
                                <Modal dir={isLang === "ar" ? "rtl" : "ltr"} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                                  <Modal.Header closeButton>
                                    <Modal.Title>{actionsTranslate[3].titleModel} {' '} {item?.ClientName} </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Component.HandelDelete />
                                  </Modal.Body>
                                  <Modal.Footer className='  d-flex justify-content-center'>
                                    <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleDeleteUser(item.IDUser)}>
                                      {actionsTranslate[3].btn1}
                                    </Button>
                                    <Button variant="outline-primary" onClick={() => setShowDeleteModal(false)}>
                                      {actionsTranslate[3].btn2}
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                                <NavDropdown.Divider />

                                {
                                  statusTranslate?.filter?.((item) => item.value !== "All").map((status, index) => (
                                    <React.Fragment key={index}>
                                      {
                                        item?.ClientStatus === status.value ? '' : <Dropdown.Item className={isLang === "ar" ? "dropdown-itemAr" : "dropdown-itemEn"} eventKey={status.value}>{status.text}</Dropdown.Item>
                                      }
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
              </Table> :
              <Component.DataNotFound />
          }
        </>
      </> : SkeletonTable()}

    </>
  )
}

export default ClientTable