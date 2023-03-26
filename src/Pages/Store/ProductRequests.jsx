import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Icons from '../../constants/Icons';

const ProductRequests = ({ translate,Request, isLoader }) => {

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
            <Table responsive={true} striped bordered hover size="sm" className='Skeleton_table'>
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
                        <h3 >{translate.requestsTitle}  </h3>
                    </div>
                }
            </> : SkeletonHeader()}

            {isLoader ? <>
                {Request &&
                    <Table responsive={true} striped bordered hover size="sm">
                        <thead>
                            <tr>
                            {
                                    translate?.Requests?.map((item, index) => (
                                        <th className='text-center'key={index}>{item}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Request?.map((item, index) => (
                                    <tr key={index}>
                                        {/*  Buyer Info */}
                                        <td className='text-center d-flex flex-column '>
                                            <span className='ClientName'>{item?.BuyerName}</span>
                                            <span className='ClientPhone'>{item?.BuyerPhone}</span>
                                        </td>
                                        {/* Price */}
                                        <td className='text-center'>{item?.AnimalProductPrice}</td>
                                        {/* Cutting Fees */}
                                        <td className='text-center d-flex flex-column '>
                                            <span className='ClientName'>{item?.AnimalProductCuttingFees === 0 ? <Icons.Check color='#40AB45' size={18} /> : item?.AnimalProductCuttingFees}</span>
                                            {item?.AnimalProductCuttingFees !== 0 && <span className='ClientPhone'>{item?.CuttingName}</span>}
                                        </td>
                                        {/* Bagging Fees */}
                                       
                                        <td className='text-center m-0 p-0 '>
                                            <span className="d-flex flex-column gap-0 ">
                                                <span className='ClientName'>{item?.AnimalProductBaggingFees === 0 ? <Icons.Uncheck color='#E20000' size={18} /> : item?.AnimalProductBaggingFees}</span>
                                                {item?.AnimalProductBaggingFees !== 0 && <span className='ClientPhone'>{item?.BaggingName}</span>}
                                            </span>
                                        </td>
                                        {/* DeliveryFees */}
                                        <td className='text-center'>{item?.AnimalProductDeliveryFees === 0 ? <Icons.Uncheck color='#E20000' size={18} /> : item?.AnimalProductDeliveryFees}</td>
                                         {/* DeliveryRequest */}
                                        <td className='text-center'>{item?.DeliveryRequest === 1 ? <Icons.Check color='#40AB45' size={18} /> : <Icons.Uncheck color='#E20000' size={18} />}</td>
                                        {/* Note */}
                                        <td className='text-center'>{item?.AnimalProductTotalPrice === 0 ? <Icons.Uncheck color='#E20000' size={18} /> : item?.AnimalProductTotalPrice}</td>
                                        <td className='text-center'>{item?.AnimalProductRequestNote?.split(" ").slice(0, 2).join(' ')}</td>
                                        {/* Status */}
                                        <td className=' text-center'> {item?.AnimalProductRequestStatus?.charAt(0)?.toUpperCase() + item.AnimalProductRequestStatus?.slice(1)?.toLowerCase()}</td>
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
