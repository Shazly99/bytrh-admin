import React from 'react'
import { Container, Table } from 'react-bootstrap';
import Component from "../../../constants/Component";
import { Box, Pagination, Typography } from "@mui/material";
import data from './data';

const Orders = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <Container fluid>
        <div className="app__orders">
          <Component.BaseHeader h1={'Orders List'} />
          <div className="app__orders">
            <Table striped responsive={true} className='rounded-3 '>
              <thead>
                <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  <th>Client</th>
                  <th> Phone No.</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {
                  data.map((item, index) => (
                    <tr  key={index}>
                      <td>
                        <div>
                          {item.Client}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.Phone}
                        </div>
                      </td>
                      <td className='text-center'>
                        <div>
                          {item.Qty}
                        </div>
                      </td>
                      <td className='text-center'>
                        <div>
                          {item.Price}
                        </div>
                      </td>
                      <td className='text-center'>
                        <div className={`${item.Status == 'Pending' && 'txt_pending'} 
                                          ${item.Status == 'Shipped' && 'txt_shipped'}
                                          ${item.Status == 'Out For Delivery' && 'txt_delivery'}
                                          ${item.Status == 'Delivered' && 'txt_delivered'}
                                          ${item.Status == 'Rejected' && 'txt_rejected'} `}>
                          {item.Status}
                        </div>
                      </td>
                      <td className='text-center'>
                        <div>
                          {item.Action}
                        </div>
                      </td>
                    </tr>
                  ))
                }

              </tbody>

            </Table>
          </div>
        </div>
        <div className="pagination py-4">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Box>
      </div>
      </Container>
    </>
  )
}

export default Orders
