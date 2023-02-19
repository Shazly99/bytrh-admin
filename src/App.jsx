import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import './style/App.scss';
import VenderContext from './context/Store';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiheader } from './utils/fetchData';

function App() {
  const URL_Doctors = `https://bytrh.com/api/admin/doctors`;
  let token = localStorage.getItem('token')
  const [pagesCountDoctors, setPagesCountDoctors] = useState(0);
  const [countDoctors, setCountDoctors] = useState(1);
  const [searchKeyDoctors, setSearchKeyDoctors] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false)
  const [fetchDoctors, setFetchDoctors] = useState([])

  async function getTokenDoctors() {

    setLoadingDoctors(true);
    await axios.post(URL_Doctors, {
      IDPage: countDoctors,
      SearchKey: searchKeyDoctors
    }, apiheader)
      .then(res => {
        setFetchDoctors(res.data.Response.Doctors);
        setPagesCountDoctors(res.data.Response.Pages);
        setLoadingDoctors(false);
      })
      .catch((error) => {
        console.log(error)
      });
  }
  useEffect(() => {
    if (token) {
      getTokenDoctors();
    }
  }, [token, countDoctors, pagesCountDoctors, searchKeyDoctors]);
  
  // get countries Bytra
  const [fetchCountriesBytra, setFetchCountriesBytra] = useState([]);
  async function getCountriesBytra() {
    await axios.get(`https://bytrh.com/api/doctor/countries`)
      .then(res => {
        if (res.status === 200 && res.request.readyState === 4) {
          setFetchCountriesBytra(res.data.Response.Countries);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    getCountriesBytra();
  }, [])


  function ProtectedRoutes({ children }) {
    if (localStorage.getItem('token')) {
      return children
    } else {
      return <Navigate to="/auth/login" replace={true} />
    }
  }
  const root = createBrowserRouter([
    {
      path: '/', element: <Component.Vendor />, children: [
        { index: true, element: <ProtectedRoutes>  <Component.Dashboard /></ProtectedRoutes> },
        {
          path: '/user', children: [
            { index: true, element: <ProtectedRoutes>  <Component.Users /> </ProtectedRoutes> },
            { path: 'addUser', element: <ProtectedRoutes> <Component.AddNewUser /></ProtectedRoutes> },
            { path: 'editUser/:id', element: <ProtectedRoutes>  <Component.Edit /> </ProtectedRoutes> },

          ]
        },
        {
          path: '/client', children: [
            { index: true, element: <ProtectedRoutes>  <Component.Clients /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/doctors', children: [
            { index: true, element: <ProtectedRoutes><Component.Doctors getTokenDoctors={getTokenDoctors} fetchDoctors={fetchDoctors} pagesCountDoctors={pagesCountDoctors} countDoctors={countDoctors} setCountDoctors={setCountDoctors} setSearchKeyDoctors={setSearchKeyDoctors} loadingDoctors={loadingDoctors} /> </ProtectedRoutes> },
            { path: 'addDoctor', element: <ProtectedRoutes> <Component.AddDoctor getTokenDoctors={getTokenDoctors} fetchCountriesBytra={fetchCountriesBytra} /></ProtectedRoutes> },
            { path: 'editDoctor/:id', element: <ProtectedRoutes> <Component.EditDoctor getTokenDoctors={getTokenDoctors} fetchCountriesBytra={fetchCountriesBytra} /></ProtectedRoutes> },
            { path: 'doctorfields/:id', element: <ProtectedRoutes> <Component.DoctorFields /></ProtectedRoutes> },
          ]

        },
        { path: '/venderProfile', element: <ProtectedRoutes>  <Component.Profile /></ProtectedRoutes> },
      ],
    },

    {
      path: '/chat', element: <Component.Chat />, children: [
        { index: true, element: <ProtectedRoutes>  <Component.ChatClient /></ProtectedRoutes> },
        { path: '/chat/clients', element: <ProtectedRoutes>  <Component.ChatClient /></ProtectedRoutes> },
        { path: '/chat/doctors', element: <ProtectedRoutes><Component.ChatDoctors /></ProtectedRoutes> }
      ],
    },

    {
      path: '/auth/', element: <Component.Auth />, children: [
        { path: 'login', element: <Component.Login /> },
      ]
    }

  ])
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: ' Arial, Helvetica, sans-serif',
            textTransform: 'capitalize',
            zIndex: '9999',
            background: '#fff',
            color: '#000',
          },
        }}
        containerStyle={{
          top: 60
        }}
      />
      <VenderContext>
        <RouterProvider router={root} />
      </VenderContext>
    </>
  );
}

export default App;


// shazly