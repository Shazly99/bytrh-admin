import React from 'react'
import data from './data.js';
import { Table } from 'react-bootstrap'
import Icons from '../../../constants/Icons.js';

const UserTable = () => {
    return (
        <>
            <Table striped responsive={true} className='rounded-3 '>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        <th>Name</th>
                        <th> Email</th>
                        <th> User-Name</th>
                        <th>Mobile</th>
                        <th>Access Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div>
                                        {item.name}
                                    </div>
                                </td>
                                <td>
                                    <div  >
                                        {item.email}
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        {item.UserName}
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        {item.Mobile}
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        {item.AccessType}
                                    </div>
                                </td>
                                <td className='icon'>
                                    <div className="icons">
                                        <Icons.edit />
                                        <Icons.bin />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </Table>

        </>
    )
}

export default UserTable