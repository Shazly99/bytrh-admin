import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Icons from '../../../constants/Icons';

import { GetData, PostData } from '../../../utils/fetchData';
import useSkeletonTable from '../../../utils/useSkeletonTable';
import initialTranslation from '../../Settings/Translation';
import { VendersContext } from './../../../context/Store';
import { apiheader } from './../../../utils/fetchData';
 
const Contact = () => {
  let { isLang } = useContext(VendersContext);
  const [translate, setTranslate] = useState(initialTranslation)
  const handelTranslate = () => {
    setTranslate(initialTranslation)
  }
  const [generalSettingData, setGeneralData] = useState(null);
  let edit = useRef();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);
  const [isLoader, setIsloader] = useState(false);

  let { SkeletonTable, SkeletonSearchsingel, SkeletonFilterBlogs } = useSkeletonTable();

  function handleModalClose() {
    setModalShow(false);
  }

  function handleModalOpen(index) {
    setModalIndex(index);
    setModalShow(true);
  }

  const generalData = async () => {
    await GetData(`${process.env.REACT_APP_API_URL}/admin/contact`, apiheader).then((data ) => {
      setGeneralData(data.Response);
      const timeoutId = setTimeout(() => {
        setIsloader(true)
      }, 0);
      return () => clearTimeout(timeoutId);
    })
  }

  const editGeneralSettingValue = async (edit) => {
    let data = await PostData(`${process.env.REACT_APP_API_URL}/admin/generalsettings/edit`, edit, apiheader)
    generalData()
    if (data.data.Success === true) {
      toast.success('Setting Value has been updated!', {
        duration: 4000,
        position: 'top-center',
        icon: <Icons.Added color='#40AB45' size={20} />,
        iconTheme: {
          primary: '#0a0',
          secondary: '#fff',
        },
      });
      handleModalClose()
    }
  }
  const editValueSitting = async (id) => {
    await editGeneralSettingValue({ IDGeneralSetting: id, GeneralSettingValue: edit.current.value })
  }


  useEffect(() => {
    generalData();
    window.scrollTo(0, 0);
    handelTranslate()
  }, [isLang]);

  return (
    <>

      {isLoader ? <>
        <>
          <div className="app__Users ">

            <div className="app__Users-table">

              <Table responsive={true} className='rounded-3 '>
                <thead>
                  <tr className='text-center  ' style={{ background: '#F9F9F9' }}>
                  {
                    translate[isLang]?.TableContact?.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))
                  }
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    generalSettingData?.map((item, index) => (
                      <tr key={index}>
                        <td >
                          <div>
                            {item?.GeneralSettingName}
                          </div>
                        </td>
                        <td className='w-50'>
                          <p style={{ whiteSpace: "pre-wrap", fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexDirection: 'column' }}>
                            {item?.GeneralSettingValue}</p>
                          <Button variant="outline-primary" onClick={() => handleModalOpen(index)}>
                           {translate[isLang]?.Modal?.mainbtn}
                          </Button>
                          <Modal
                             dir={isLang === "ar" ? "rtl" : "ltr"}
                            show={modalShow && modalIndex === index}
                            onHide={handleModalClose}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title> {translate[isLang]?.Modal?.titleContact}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <textarea className="form-control" rows="10" defaultValue={item?.GeneralSettingValue} ref={edit} />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="primary"   onClick={handleModalClose}>
                              {translate[isLang]?.Modal?.btnClose}

                              </Button>
                              <Button variant="outline-primary" onClick={() => editValueSitting(item.IDGeneralSetting)}>
                              {translate[isLang]?.Modal?.btnSave}

                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                        <td >
                          <p style={{ whiteSpace: "pre-wrap" }}>
                            {item?.GeneralSettingDescription}
                          </p>
                        </td>


                      </tr>
                    ))
                  }

                </tbody>

              </Table>

            </div>

          </div>
          {/* <div className="pagination ">
          <Box sx={{ margin: "auto", width: "fit-content", alignItems: "center", }}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </Box>
        </div> */}
        </>
      </> : SkeletonTable()}
    </>


  )
}

export default Contact