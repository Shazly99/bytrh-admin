import React, { useEffect } from 'react'
import Component from '../../../constants/Component' 
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import {   PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';

const Clients = () => {
  const [page, setPage] = React.useState(1);
  const [usersList, setuserList] = React.useState([]);
  const [PagesNumber, setPagesNumber] = React.useState('')

  const handleChange = (event, value) => {
    setPage(value);
  };

  const userList = async (page) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: page }, apiheader)
    setuserList(data.Response.Clients)
    setPagesNumber(data.Response.Pages);
  }
  useEffect(() => {
    userList(page)
  }, [page, PagesNumber])
  return (
    <>
      <div className="app__Users ">
        {/* <Component.ButtonBase onclick={test} title={"Add new Clients"} bg={"primary"} icon={<Icons.add />}  /> */}
        <div className="app__Users-table">
          <Component.ClientTable usersList={usersList} userList={userList} />
        </div>
      </div>
      <div className="pagination ">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={PagesNumber} page={page} onChange={handleChange} />
        </Box>
      </div>
    </>
  )
}

export default Clients
