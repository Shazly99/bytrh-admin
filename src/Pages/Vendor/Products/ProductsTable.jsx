import React from 'react'
import { Table } from 'react-bootstrap'
import data from './data.js';
import Icons from "../../../constants/Icons.js";

function ProductsTable() {
    return (
        <>
            <Table striped responsive={true} className='rounded-3 '>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    <img src={item.img}  />
                                </td>
                                <td >
                                    <div>
                                        {item.name}
                                    </div>
                                </td>
                                <td>
                                    <div className='color-red'>
                                        {item.category}
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        {item.price}
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

export default ProductsTable
