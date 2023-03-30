import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import { Button, Dropdown, DropdownButton, Modal, NavDropdown, Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import Icons from "../../../constants/Icons.js";
import { apiheader, PostData } from '../../../utils/fetchData.js';
import useSkeletonTable from '../../../utils/useSkeletonTable.js';
import Component from '../../../constants/Component.js';
import { VendersContext } from '../../../context/Store.js';

function UsersTable({ usersList, userList, isLoader,toastTranslate, actionsTranslate, statusTranslate, tabelTranslate }) {
    let { SkeletonTable } = useSkeletonTable();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState({});
    let { isLang } = useContext(VendersContext);

    const handleActionSelect = async (id, action) => {
        if (action === "PENDING" || action === "ACTIVE" || action === "INACTIVE") {
            await userstatus({ IDUser: id, UserStatus: action }).then((res) => {
                toast.success(<strong>{toastTranslate.update}</strong>,{
                    duration: 4000,
                    position: 'bottom-center', 
                    iconTheme: {
                        primary: '#3182CE',
                        secondary: '#fff',
                    },
                });
            })
            await userList()
        } else if (action === "DELETED") {
            setSelectedUserId({ IDUser: id, UserStatus: action });
            setShowDeleteModal(true);
        }
    };

    const userstatus = async (status) => {
        return await PostData(`https://bytrh.com/api/admin/users/status`, status, apiheader)
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
    }, [usersList, selectedUserId])



    return (
        <>
            {isLoader ? <>
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

                                    <td >
                                        <div>
                                            {item?.UserName}
                                        </div>
                                    </td>
                                    <td >
                                        <div>
                                            {item?.UserEmail}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='color-red ClientPhone'>
                                            {item?.UserPhone}
                                        </div>
                                    </td>
                                    <td className='text-center  d-flex '>
                                        <div>
                                            <span style={{ height: 'fit-content !important' }} className={`
                                          ${item.UserStatus === 'PENDING' && 'txt_pending'} 
                                          ${item.UserStatus === 'Shipped' && 'txt_shipped'}
                                          ${item.UserStatus === 'Out For Delivery' && 'txt_delivery'}
                                          ${item.UserStatus === 'ACTIVE' && 'txt_delivered'}
                                          ${item.UserStatus === 'INACTIVE' && 'txt_rejected'}`} >
                                                                       {
                                statusTranslate?.filter((itemfilter) => itemfilter.value === item?.UserStatus)
                                  .map((status, index) => (
                                    <React.Fragment key={index}>
                                      {item?.UserStatus === status.value ? status.text : ''}
                                    </React.Fragment>
                                  ))
                              }
                                            </span>
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <div>
                                            {item?.RoleName}
                                        </div>
                                    </td>

                                    <td>
                                        <div>

                                            <span>
                                                <DropdownButton
                                                    id={`dropdown-${item.IDUser}`}
                                                    title={actionsTranslate[0].name}
                                                    variant="outline-success"
                                                    onSelect={(eventKey) => handleActionSelect(item.IDUser, eventKey)}
                                                    className="DropdownButton "
                                                >
                                                    <Dropdown.Item eventKey="Edite" className={isLang ==="ar"?"dropdown-itemAr":"dropdown-itemEn" }  as={Link} to={`/user/editUser/${item.IDUser}`}>
                                                        {actionsTranslate[1].name}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className={isLang ==="ar"?"dropdown-itemAr":"dropdown-itemEn" }  eventKey="DELETED">{actionsTranslate[2].name}</Dropdown.Item>

                                                    <Modal dir={isLang === "ar" ? "rtl" : "ltr"} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>{actionsTranslate[2].titleModel} {' '}   {item?.UserName}  </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Component.HandelDelete />
                                                        </Modal.Body>
                                                        <Modal.Footer className='  d-flex justify-content-center'>
                                                            <Button variant="danger" style={{ border: '#dc3545' }} onClick={() => handleDeleteUser(item.IDUser)}>
                                                                {actionsTranslate[2].btn1}
                                                            </Button>
                                                            <Button variant="outline-primary" onClick={() => setShowDeleteModal(false)}>
                                                                {actionsTranslate[2].btn2}

                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    <NavDropdown.Divider />

 
                                                    {
                                                        statusTranslate?.filter?.((item) => item.value !== "All").map((status, index) => (
                                                            <React.Fragment key={index}>
                                                                {
                                                                    item?.UserStatus === status.value ? '' : <Dropdown.Item className={isLang ==="ar"?"dropdown-itemAr":"dropdown-itemEn" }  eventKey={status.value}>{status.text}</Dropdown.Item>
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

                </Table>
            </> : SkeletonTable()}
        </>
    )
}

export default UsersTable
