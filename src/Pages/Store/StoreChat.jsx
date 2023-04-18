import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const StoreChat = ({ chat, isLoader, translate }) => {

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
                        <th style={{ padding: '15px', textAlign: 'center', margin: 'auto' }} >  <Skeleton variant='rounded' height={10} width="30%" /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chat?.map((item, index) => (
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
                {chat &&
                    <div className="product_description">
                        <h3 >{translate.chatTitle}</h3>
                    </div>
                }
            </> : SkeletonHeader()}

            {isLoader ? <>
                {chat &&
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {
                                    translate?.chat?.map((item, index) => (
                                        <th className='text-center'key={index}>{item}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                chat?.map((item, index) => (
                                    <tr key={index}>
                                        <td  className='text-center'>   <Link to={`/store/details/${item.IDAnimalProduct}/chat/${item.IDAnimalProductChat}`} className='d-block'> {item.BuyerName} </Link></td>
                                        <td className='text-center'><Link to={`/store/details/${item.IDAnimalProduct}/chat/${item.IDAnimalProductChat}`} className='d-block'>{item.BuyerPhone}</Link></td>
                                        <td  className='text-center'><Link to={`/store/details/${item.IDAnimalProduct}/chat/${item.IDAnimalProductChat}`} k className='d-block'> {item.ChatStatus.charAt(0).toUpperCase() + item.ChatStatus.slice(1).toLowerCase()}</Link></td>
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

export default StoreChat