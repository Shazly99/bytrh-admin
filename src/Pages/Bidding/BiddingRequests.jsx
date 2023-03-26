import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icons from '../../constants/Icons';

const BiddingRequests = ({ translate, Request, isLoader, currency }) => {
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
                        <h3 > {translate.requestsTitle} </h3>
                    </div>
                }
            </> : SkeletonHeader()}

            {isLoader ? <>
                {Request &&
                    <Table responsive={true} striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {
                                    translate.Requests?.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))
                                }
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
                                         <td className='text-center'>
                                        <h6 className="mb-0  pe-2 color-red">
                                            {item?.AnimalProductPrice}{' '}{currency}
                                        </h6>
                                        </td>
                                        <td className='text-center'> {item?.AnimalProductRequestStatus?.charAt(0)?.toUpperCase() + item.AnimalProductRequestStatus?.slice(1)?.toLowerCase()}</td>
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