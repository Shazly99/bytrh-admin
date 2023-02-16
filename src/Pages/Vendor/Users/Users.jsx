import React, { useEffect } from 'react'
import Component from '../../../constants/Component'
import './Users.scss'
import Icons from "../../../constants/Icons.js";
import { Pagination, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GetData, PostData } from '../../../utils/fetchData';
import { apiheader } from './../../../utils/fetchData';

function Users() {
  const [page, setPage] = React.useState(1);
  const [usersList, setuserList] = React.useState([]);
  const [PagesNumber, setPagesNumber] = React.useState('')

  const handleChange = (event, value) => {
    setPage(value);
  };
  const test = () => {

  }

  const userList = async (page) => {
    let { data } = await PostData(`https://bytrh.com/api/admin/users`, { IDPage: page }, apiheader)
    setuserList(data.Response.Users)
    setPagesNumber(data.Response.Pages);

  }
  useEffect(() => {
    userList(page)
  }, [page, PagesNumber])

  return (
    <>
      <div className="app__Users ">
        <Component.ButtonBase onclick={test} title={"Add new user"} bg={"primary"} icon={<Icons.add />} path="/user/addUser" />
        <div className="app__Users-table">
          <Component.UsersTable usersList={usersList} userList={userList} />
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

export default Users
