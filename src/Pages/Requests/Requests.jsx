import { Box, Pagination } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { VendersContext } from '../../context/Store';
import { PostData, apiheader } from '../../utils/fetchData';
import useSkeletonTable from '../../utils/useSkeletonTable';
import ActionsRequests from './ActionsRequests';
import initialTranslation from './Translation';

const Requests = () => {
    let { isLang } = useContext(VendersContext);

    const [translate, setTranslate] = useState(initialTranslation)
    const handelTranslate = () => setTranslate(initialTranslation)

    const [RequestsData, setRequestsData] = useState([]);
    const [isLoader, setIsloader] = useState(true);
    let { SkeletonTable } = useSkeletonTable();

    // to fixed problem because Pagination count need a number 
    const [page, setPage] = React.useState(1);
    const [PagesNumber, setPagesNumber] = React.useState('')
    const handleChange = (event, value) => setPage(value);
    const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

    const RequestsList = async (page) => {
        setIsloader(true)
        await PostData(`${process.env.REACT_APP_API_URL}/admin/pendingrequests`, { IDPage: page }, apiheader).then(({ data }) => {
            setRequestsData(data.Response.PendingRequests);
            setPagesNumber(data.Response.Pages);
            setIsloader(false); 
        }).catch((err) => {
            console.log(err);
        })
    }



    useEffect(() => {
        const timeOut = setTimeout(() => {
            RequestsList(page)
            window.scrollTo(0, 0);
            handelTranslate()
        }, 200);

        return () => clearTimeout(timeOut);

    }, [isLang])

    return (
        <>
            <div className="app__Users ">
                <div className="app__Users-table">
 
                    {!isLoader ?
                        <>
                            <Table responsive={true} className='rounded-3 '>
                                <thead>
                                    <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                        {
                                            translate[isLang]?.TableHeader?.map((item, index) => (
                                                <th key={index}>{item}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        RequestsData?.map((item, index) => (
                                            <tr key={index}>
                                                <td >
                                                    <div>
                                                        {item?.PendingRequestType.charAt(0).toUpperCase() + item?.PendingRequestType.slice(1).toLowerCase().replace('_', ' ')}
                                                    </div>
                                                </td>
                                                <td >
                                                    <div>
                                                        {item?.PendingRequestTitle}
                                                    </div>
                                                </td>

                                                <td >

                                                    <div className="d-flex flex-column justify-content-center align-content-center" style={{ gap: "0" }}  >
                                                        <span className="ClientName">  {" "}    {item?.created_at.split("T")[0]}{" "}   </span>
                                                        <span className="ClientPhone">  {" "} {item?.created_at.split("T")[1]}  </span>
                                                    </div>

                                                </td>


                                                <td>
                                                    <div>
                                                        <ActionsRequests
                                                            RequestType={item?.PendingRequestType}
                                                            RequestStatus={item?.PendingRequestStatus}
                                                            idType={item?.IDLink}
                                                            RequestsList={()=>RequestsList(page)}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>

                            </Table>
                            <div className="pagination " dir="ltr">
                                {
                                    pageCount &&
                                    <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                                        <Pagination count={pageCount} page={page} onChange={handleChange} />
                                    </Box>
                                }
                            </div>
                        </>
                        :
                        SkeletonTable()
                    }
                </div>

            </div>
        </>
    )
}

export default Requests
