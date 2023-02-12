import { Box, Pagination } from '@mui/material'
import React from 'react'
import Component from '../../../constants/Component'
import Icons from '../../../constants/Icons';
import './user.scss'
function SubUsers() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <div className="app__order">
        <Component.ButtonBase title={"Add Sub User"} bg={"primary"} icon={<Icons.add />} path="/venderSubuser/addUser" />
        <div className="app__order-table">
          <Component.UserTable />
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

export default SubUsers
