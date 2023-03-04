import React, { useState } from 'react';
// import { FiEdit3 } from 'react-icons/fi';
// import { AiOutlineDelete } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
// import { useEffect } from 'react';
import { apiheader, PostData } from '../../../utils/fetchData';


export default function ItemAdoption({ id , clientName , petName , petStrain , petPicture , cityName , cate , status , getTokenAdoption }) {



    const userstatus = async (status) => {
        let { data } = await PostData(`https://bytrh.com/api/admin/adoptions/status`, status, apiheader)
    }


    const handleActionSelect = async (id, action) => {
        if (action === "PENDING") {
            await userstatus({ IDAdoption: id, AdoptionStatus: action })
            await getTokenAdoption()
        } else if (action === "ACTIVE") {
            await userstatus({ IDAdoption: id, AdoptionStatus: action })
            await getTokenAdoption()
        } else if (action === "ADOPTED") {
            await userstatus({ IDAdoption: id, AdoptionStatus: action })
            await getTokenAdoption()
        } else if (action === "CANCELLED") {
            await userstatus({ IDAdoption: id, AdoptionStatus: action })
            await getTokenAdoption()
        }
    };




    let navigate = useNavigate();

    const goToAdoptionDetails = (id) => {
        navigate(`./details/${id}`);
    }



    return (
        <>
            <tr>
                <td>
                    <img src={petPicture} className='mx-auto' style={{width: '250px' , height: '150px' , cursor: 'pointer'}} alt="pet-image"  />
                </td>
                <td>
                    <div style={{cursor: petName ? 'pointer' : 'default'}} >{petName ? petName : '_'}</div>
                </td>
                <td>
                    <div>{petStrain ? petStrain : '_'}</div>
                </td>
                <td>
                    <div>{cate ? cate : '_'}</div>
                </td>
                <td>
                    <div>{cityName ? cityName : '_'}</div>
                </td>
                <td>
                    <div>{clientName ? clientName : '_'}</div>
                </td>
                <td className='text-center '>
                    <span style={{ height: 'fit-content !important' }} className={`
                            ${status == 'PENDING' && 'txt_pending py-2'} 
                            ${status == 'CANCELLED' && 'txt_cancel py-2'}
                            ${status == 'ADOPTED' && 'txt_blocked py-2'}
                            ${status == 'ACTIVE' && 'txt_delivered py-2'}`} >
                        {status.toLowerCase()}
                    </span>
                </td>

                <td>
                    <span>
                        <DropdownButton
                            id={`dropdown-${id}`}
                            title="Actions"
                            variant="outline-success"
                            onSelect={(eventKey) => handleActionSelect(id, eventKey)}
                            className="DropdownButton "
                        >
                            {
                                status === "PENDING" ? 
                                <>
                                    <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                    <Dropdown.Item eventKey="ADOPTED">ADOPTED</Dropdown.Item>
                                    <Dropdown.Item eventKey="CANCELLED">CANCELLED</Dropdown.Item>
                                </> :

                                status === "ACTIVE" ? 
                                <>
                                    <Dropdown.Item eventKey="ADOPTED">ADOPTED</Dropdown.Item>
                                    <Dropdown.Item eventKey="CANCELLED">CANCELLED</Dropdown.Item>
                                </> :

                                status === "CANCELLED" ?
                                <>
                                    <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                </> :
                                
                                status === "ADOPTED" ?
                                <>
                                    <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                                    <Dropdown.Item eventKey="CANCELLED">CANCELLED</Dropdown.Item>
                                </> : ''
                            }
                            {/* {
                                status === "ACTIVE" ? '' : <Dropdown.Item eventKey="ACTIVE">Active</Dropdown.Item>
                            }
                            {
                                status === "CANCELLED" ? '' : <Dropdown.Item eventKey="CANCELLED">CANCELLED</Dropdown.Item>
                            }
                            {
                                status === "ADOPTED" ? '' : <Dropdown.Item eventKey="ADOPTED">ADOPTED</Dropdown.Item>
                            }
                            {
                                status === "PENDING" ? '' : <Dropdown.Item eventKey="PENDING">PENDING</Dropdown.Item>
                            } */}
                        </DropdownButton>
                    </span>
                </td>

            </tr>
        </>
    )
}
