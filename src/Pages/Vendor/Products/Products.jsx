import React from 'react'
import Component from '../../../constants/Component'
import './Products.scss'
import Icons from "../../../constants/Icons.js"; 
import { Pagination, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Products() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const test=()=>{ 
    
  }
  return (
    <>
      <div className="app__products ">
        <Component.ButtonBase onclick={test} title={"Add new product"}  bg={"danger"} icon={<Icons.add />} path="/venderProducts/addProduct" />
        <div className="app__products-table">
          <Component.ProductsTable />
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

export default Products
