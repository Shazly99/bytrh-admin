import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import Component from '../../../constants/Component';
import { VendersContext } from '../../../context/Store';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import { getAllContactUsClients } from '../Services';
import initialTranslation from '../Translation';

const ContactUsClient = () => {
    let { isLang } = useContext(VendersContext);

    const [isLoading, setIsLoading] = useState(true);
    const [Client, setClient] = useState([]);
    let { SkeletonTable } = useSkeletonTable();

    // to fixed problem because Pagination count need a number 
    const [page, setPage] = useState(1);
    const [PagesNumber, setPagesNumber] = useState('')
    const handleChange = (event, value) => setPage(value);
    const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;


    // Get Client List
    const getAllClientList = async () => {
        try {
            // Get Client
            await getAllContactUsClients(page, 'CLIENT')
                .then(({ data }) => {
                    if (data.Success) {
                        setClient(data.Response.ContactUs);
                        setPagesNumber(data.Response.Pages);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setClient([]);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllClientList();
    }, [isLang, page]);

    if (isLoading) return SkeletonTable();
    return (
        <div className="app__Users-table">

            <>
                {
                    Client?.length > 0 ?
                        <Table responsive={true} className='rounded-3 '>
                            <thead>
                                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                                    {
                                        initialTranslation[isLang]?.TableHeader?.map((item, index) => (
                                            <th key={index}>{item}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    Client?.map((item, index) => (
                                        <tr key={index}>
                                            <td >
                                                <span className='ClientName'>{item?.UserName}</span>
                                            </td>
                                            <td >
                                                <span className='ClientName'>{item?.Email}</span>
                                            </td>
                                            <td>
                                                <span className='ClientName'>{item?.Message}</span>
                                            </td>
                                            <td>
                                                {item?.created_at.split("T")[0]}{" "}
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>

                        </Table>
                        :
                        <Component.DataNotFound />
                }
            </>
            <div className="pagination " dir="ltr">
                {
                    pageCount &&
                    <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
                        <Pagination count={pageCount} page={page} onChange={handleChange} />
                    </Box>
                }
            </div>
        </div>
    )
}

export default ContactUsClient
