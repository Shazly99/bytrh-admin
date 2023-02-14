import React, { useEffect } from 'react'
import Component from '../../../constants/Component'
// import './Clients.scss'
import Icons from "../../../constants/Icons.js";
import { Pagination, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GetData, PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';
const Clients = () => {
  const [page, setPage] = React.useState(1);
  const [usersList, setuserList] = React.useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const test = () => { 
  }

  const userList = async () => {
    let { data } = await PostData(`https://bytrh.com/api/admin/clients`, { IDPage: 1 }, apiheader)
    setuserList(data.Response.Clients)
    console.log(data);
  }
  useEffect(() => {
    userList()
  }, [])
  return (
    <>
      <div className="app__Users ">
        <Component.ButtonBase onclick={test} title={"Add new Clients"} bg={"primary"} icon={<Icons.add />}  />
        <div className="app__Users-table">
          <Component.ClientTable usersList={usersList} userList={userList} />
        </div>
      </div>
      <div className="pagination ">
        <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Box>
      </div>
    </>
  )
}

export default Clients
