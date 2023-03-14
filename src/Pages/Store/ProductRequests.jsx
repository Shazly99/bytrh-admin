import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductRequests = ({ Request, isLoader }) => {

    useEffect(() => {
        console.log(Request);
    }, [isLoader])
    const SkeletonHeader = () => {
        return (
            <div className="product_description mb-3">
                <Skeleton variant='rounded' height={30} width="30%" />
            </div>
        )
    }
    const SkeletonTable = () => {
        return (


            <Table striped bordered hover size="sm" className='Skeleton_table'>
                <thead>
                    <tr  >
                        <th style={{ padding: '15px !important', textAlign: 'center', margin: 'auto' }}>  <Skeleton variant='rounded' height={10} width="30%" /></th>
                        <th style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}>  <Skeleton variant='rounded' height={10} width="30%" /></th>
                        <th style={{ padding: '15px', textAlign: 'center', margin: 'auto' }} >  <Skeleton variant='rounded' height={10} width="30%" /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Request?.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}>    <Skeleton variant='rounded' height={10} width="30%" /> </td>
                                <td style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}><Skeleton variant='rounded' height={10} width="30%" /></td>
                                <td style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}><Skeleton variant='rounded' height={10} width="30%" /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }
    return (
        <>
            {isLoader ? <>
                {Request &&
                    <div className="product_description">
                        <h3 > Animal Product Requests  </h3>
                    </div>
                }
            </> : SkeletonHeader()}

            {isLoader ? <>
                {Request &&
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className='first_th'>  Name</th>
                                <th>  Phone</th>
                                <th>   Note</th>
                                <th>   Price</th>
                                <th className='last_th'>  Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Request?.map((item, index) => (
                                    <tr key={index}>
                                        <td className='first_th'>   <Link className='d-block'> {item?.BuyerName} </Link></td>
                                        <td className='text-center'><Link className='d-block'>{item?.BuyerPhone}</Link></td>
                                        <td className='text-center'><Link className='d-block'>{item?.AnimalProductRequestNote}</Link></td>
                                        <td className='text-center'><Link className='d-block'>{item?.AnimalProductPrice}</Link></td>
                                        <td className='last_th'><Link className='d-block'> {item?.AnimalProductRequestStatus?.charAt(0)?.toUpperCase() + item.AnimalProductRequestStatus?.slice(1)?.toLowerCase()}</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                }
            </> : SkeletonTable()}

        </>
    )
}

export default ProductRequests
