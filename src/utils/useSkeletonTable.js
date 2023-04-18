

import { Skeleton } from '@mui/material';
import { Table } from 'react-bootstrap';

const useSkeletonTable = () => {
    const SkeletonTable = () => {
        return (
            <Table responsive={true} className='rounded-3 '>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="100px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="100px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="100px" /></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        Array.from(Array(10).keys())?.map((index) => (
                            <tr key={index}>
                                <td>
                                    <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td >
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }

    const SkeletonTableImg = () => {
        return (
            <Table responsive={true} className='rounded-3 '>
                <thead>
                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="100px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="100px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="70px" /></th>
                        <th>  <Skeleton className=' m-auto' variant='rounded' height={10} width="100px" /></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        Array.from(Array(10).keys())?.map((index) => (
                            <tr key={index}>
                                <td>
                                    <div className='d-flex flex-column justify-content-center align-content-center' style={{ gap: '0' }}>
                                        <Skeleton variant='rounded' width={145} height={96} />
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td className='text-center  d-flex '>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td >
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <Skeleton variant='rounded' height={10} width="100px" />

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }
    const SkeletonSearch = (w, h) => {
        return (
            <div className='d-flex gap-2'>
                <Skeleton variant='rounded' animation='wave' height={w} width={100} />
                <Skeleton variant='rounded' animation='wave' height={w} width={500} />
            </div>
        )
    }
    const SkeletonExcel = (w, h) => {
        return (
            <div className='d-flex gap-2 mb-2'>
                <Skeleton variant='rounded' animation='wave' height={w} width={200} /> 
            </div>
        )
    }
    const SkeletonSearchsingel = (w, h) => {
        return (
            <div className='d-flex gap-2'>
  
                <Skeleton variant='rounded' animation='wave' height={w} width={500} />
            </div>
        )
    }
    const SkeletonFilters = (w, h) => {
        return (
            <div className='d-flex gap-2'>
                <Skeleton variant='rounded' animation='wave' height={w} width={h} />
            </div>
        )
    }
    const SkeletonFilterBlogs  = () => {
        return (
            <div className="d-flex flex-column  gap-2 mt-2">
                <Skeleton variant='rounded' animation='wave' height={15} width={'60%'} />
                <Skeleton variant='rounded' animation='wave' height={35} width={'100%'} />
            </div>
        )
    }
    return {
        SkeletonTable,
        SkeletonSearch,
        SkeletonFilters,
        SkeletonSearchsingel,
        SkeletonTableImg,
        SkeletonFilterBlogs,
        SkeletonExcel
    }
}


export default useSkeletonTable;
