import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icons from '../../constants/Icons';

const BiddingRequests = ({ Request, isLoader }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
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
                        <th style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}>  <Skeleton variant='rounded' height={10} width="30%" /></th>
                        <th style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}>  <Skeleton variant='rounded' height={10} width="30%" /></th>
                        <th style={{ padding: '15px', textAlign: 'center', margin: 'auto' }} >  <Skeleton variant='rounded' height={10} width="30%" /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from(Array(2).keys())?.map((index) => (
                            <tr key={index}>
                                <td style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}>    <Skeleton variant='rounded' height={10} width="30%" /> </td>
                                <td style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}><Skeleton variant='rounded' height={10} width="30%" /></td>
                                <td style={{ padding: '15px', textAlign: 'center', margin: 'auto' }}><Skeleton variant='rounded' height={10} width="30%" /></td>
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
                    <Table responsive={true} striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th >  Buyer Info</th>
                            {/*     <th>Phone</th> */}
                                <th>Note</th>
                                <th>CuttingName</th>
                                <th>CuttingFees</th>
                                <th>BaggingName</th>
                                <th>BaggingFees</th>
                                <th>DeliveryRequest</th>
                                <th>DeliveryFees</th>
                                <th>Price</th>
                                <th className='last_th'>  Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Request?.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center d-flex flex-column '>
                                            <span className='ClientName'>{item?.BuyerName}</span>
                                            <span className='ClientPhone'>{item?.BuyerPhone}</span> 
                                        </td> 
                                        <td className='text-center'>{item?.AnimalProductRequestNote?.split(" ").slice(0, 2).join(' ')}</td>

                                        <td className='text-center'>{item?.CuttingName}</td>
                                        <td className='text-center'>{item?.AnimalProductCuttingFees  === 0? <Icons.check color='#40AB45'size={18}/> : <Icons.uncheck color='#E20000' size={18}/> }</td>
                                        <td className='text-center'>{item?.BaggingName}</td>
                                        <td className='text-center'>{item?.AnimalProductBaggingFees === 1 ? <Icons.check color='#40AB45'size={18}/> : <Icons.uncheck color='#E20000' size={18}/> }</td>
                                        <td className='text-center'>{item?.DeliveryRequest === 1 ? <Icons.check color='#40AB45'size={18}/> : <Icons.uncheck color='#E20000' size={18}/> }</td>
                                        <td className='text-center'>{item?.AnimalProductDeliveryFees === 1 ? <Icons.check color='#40AB45'size={18}/> : <Icons.uncheck color='#E20000' size={18}/> }</td>
                                        <td className='text-center'>{item?.AnimalProductPrice}</td>
                                        <td className='last_th'> {item?.AnimalProductRequestStatus?.charAt(0)?.toUpperCase() + item.AnimalProductRequestStatus?.slice(1)?.toLowerCase()}</td>
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

export default BiddingRequests