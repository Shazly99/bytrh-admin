import React from "react";
import { Table, DropdownButton, Button, Modal, NavDropdown } from "react-bootstrap";

import Component from "../../../constants/Component";
import Icons from "../../../constants/Icons";
import { GetData, PostData, apiheader } from "./../../../utils/fetchData";
import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModalPrice from './Modal';
const CuttingPricing = () => {
  const [animal, setAnimal] = useState(null);
  const [page, setPage] = useState(1);
  const [PagesNumber, setPagesNumber] = useState("");


  const [modalShow, setModalShow] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);
  function handleModalClose() {
    setModalShow(false);
  }
  function handleModalOpen(index) {
    setModalIndex(index);
    setModalShow(true);
  }

  // pagination
  const pageCount = Number.isInteger(PagesNumber) ? parseInt(PagesNumber) : 0;

  // get baggings
  const baggings = async () => {
    await PostData(
      `${process.env.REACT_APP_API_URL}/admin/cuttings/pricing`,
      { IDPage: page },
      apiheader
    )
      .then(({ data }) => {
        setAnimal(data.Response.SubCategoryCutting);
        setPagesNumber(data.Response.Pages);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          setTimeout(() => {
            baggings();
          }, (retryAfter || 60) * 1000);
        }
      });
  };

  // pagination
  const handleChange = (event, value) => {
    setPage(value);
  };
  // change status
  const handleActionSelect = async (id, action) => {

    await baggingsStatus(id).then((res) => {
      toast.success("Deleted", {
        duration: 4000,
        position: "top-center",
        icon: <Icons.uploadItem color="#3182CE" size={20} />,
        iconTheme: {
          primary: "#0a0",
          secondary: "#fff",
        },
      });
    });
    await baggings();

  };
  const baggingsStatus = async (id) => {
    console.log(id);

    // return await GetData(
    //   `${process.env.REACT_APP_API_URL}/admin/cuttings/pricing/status/${id}`,
    //   apiheader
    // );
  };

  // search and filter

  useEffect(() => {
    baggings(page);
  }, [page]);
  useEffect(() => { }, [page, PagesNumber]);

  return (
    <>
      {animal ? (
        <>
          <div className="app__Users ">
            <Component.ButtonBase
              title={"Add  "}
              bg={"primary"}
              icon={<Icons.add size={21} color={"#ffffffb4"} />}
              path="/animals/cuttingprice/addcuttingprice"
            />
            <div className="app__Users-table">
              <div className="search-container">
                {/* <div className='search__group'>
                  <input className='shadow' type="text" placeholder="Search by animal category....." name="search" value={searchValue} onChange={handleInputChange} />
                  <button type="submit" onClick={handleSearchClick}>
                    <Icons.Search color='#fff' size={25} />
                  </button>
                </div>

                <div className='filter__group'>
                  <label>
                    {
                      selectedOption === "All" ?
                        <input
                          type="radio"
                          name="filter"
                          value="All"
                          checked
                          onChange={handleOptionChange}
                          className={`inactive-radio form-check-input `}
                        /> :
                        <input
                          type="radio"
                          name="filter"
                          value="All"
                          checked={selectedOption === "All"}
                          onChange={handleOptionChange}
                          className={`inactive-radio form-check-input `}
                        />
                    }

                    All
                  </label>
                  <label className='active'>
                    <input
                      type="radio"
                      name="filter"
                      value="ACTIVE"
                      checked={selectedOption === "ACTIVE"}
                      onChange={handleOptionChange}
                      className="active-radio form-check-input"

                    />
                    Active
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="filter"
                      value="INACTIVE"
                      checked={selectedOption === "INACTIVE"}
                      onChange={handleOptionChange}
                      className="inactive-radio form-check-input"

                    />
                    InActive
                  </label>

                </div> */}
              </div>
              <Table responsive={true} className="rounded-3 ">
                <thead>
                  <tr
                    className="text-center  "
                    style={{ background: "#F9F9F9" }}
                  >
                    <th>Animal Name</th>
                    <th>Cutting Name</th>
                    <th>Cutting Price </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {animal?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div>{item?.AnimalSubCategoryName}</div>
                      </td>
                      <td>
                        <div>{item?.CuttingName}</div>
                      </td>

                      <td>
                        <div>
                          <h6 class="mb-0  pe-2 color-red">{item?.SubCategoryCuttingPrice}{' '}SAR</h6>
                        </div>
                      </td>

                      <td>
                        <div>
                          <span>
                            <Button
                              variant="outline-delete"
                              onClick={() => handleModalOpen(index)}
                              className="DropdownButton outline-sucess"
                            >Detete</Button>
                            <Modal
                              show={modalShow}
                              onHide={handleModalClose}
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title className='  w-100 text-center'>  price Details</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>

                                <textarea className="form-control" defaultValue={item.SubCategoryCuttingPrice} disabled />

                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="primary" onClick={handleModalClose}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="pagination ">
            <Box
              sx={{
                margin: "auto",
                width: "fit-content",
                alignItems: "center",
              }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
              />
            </Box>
          </div>
        </>
      ) : (
        <Component.Loader />
      )}
    </>
  );
};

export default CuttingPricing;
