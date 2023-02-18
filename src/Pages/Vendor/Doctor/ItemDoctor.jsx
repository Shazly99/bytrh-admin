import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export default function ItemDoctor({name , email , phone , country , type , balance , status , item , id}) {


    return (
        <>
            <tr>
                <td>{name} <br/> {phone}</td>
                {/* <td>{email}</td> */}
                {/* <td>{phone}</td> */}
                <td>{country}</td>
                <td>{type}</td>
                <td>{balance}</td>
                <td className={status === 'ACTIVE' ? 'text-success' : 
                    status === 'NOT_VERIFIED' ? 'text-muted' : 
                    status === 'BLOCKED' ? 'main-color' : 
                    status === 'OFFLINE' ? 'text-danger' : ''}>{status}
                </td>
                <td>
                    <Link to={`/doctors/doctorFields/${id}`} className='me-3 '>
                        <AiOutlineDelete className='text-danger'/>
                    </Link>
                    <Link to={`/doctors/editDoctor/${id}`}>
                        <FiEdit3 className='main-color'/>
                    </Link>
                </td>
            </tr>
        </>
    )
}