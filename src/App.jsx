import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import './style/App.scss';
import VenderContext from './context/Store';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiheader } from './utils/fetchData';
import ChatStore from './context/ChatStore';

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
        // ?User 
        {
          path: '/user', children: [
            { index: true, element: <ProtectedRoutes>  <Component.Users /> </ProtectedRoutes> },
            { path: 'addUser', element: <ProtectedRoutes> <Component.AddNewUser /></ProtectedRoutes> },
            { path: 'editUser/:id', element: <ProtectedRoutes>  <Component.Edit /> </ProtectedRoutes> },
          ]
        },
        // ?client
        {
          path: '/client', children: [
            { index: true, element: <ProtectedRoutes>  <Component.Clients /> </ProtectedRoutes> },
          ]
        },
        // ! Rashed Doctor component
        {
          path: '/doctors', children: [
            { index: true, element: <ProtectedRoutes><Component.Doctors getTokenDoctors={getTokenDoctors} fetchDoctors={fetchDoctors} pagesCountDoctors={pagesCountDoctors} countDoctors={countDoctors} setCountDoctors={setCountDoctors} setSearchKeyDoctors={setSearchKeyDoctors} loadingDoctors={loadingDoctors} /> </ProtectedRoutes> },
            { path: 'addDoctor', element: <ProtectedRoutes> <Component.AddDoctor getTokenDoctors={getTokenDoctors} fetchCountriesBytra={fetchCountriesBytra} /></ProtectedRoutes> },
            { path: 'editDoctor/:id', element: <ProtectedRoutes> <Component.EditDoctor getTokenDoctors={getTokenDoctors} fetchCountriesBytra={fetchCountriesBytra} /></ProtectedRoutes> },
            { path: 'doctorfields/:id', element: <ProtectedRoutes> <Component.DoctorFields /></ProtectedRoutes> },
          ]
        },

        //  ! Rashed Adoption component
        {
          path: '/adoption', children: [
            { index: true, element: <ProtectedRoutes><Component.Adoption /> </ProtectedRoutes> },
          ]

        },
        
        // ToDo user profile
        { path: '/venderProfile', element: <ProtectedRoutes>  <Component.Profile /></ProtectedRoutes> },
        // ToDo Animal Categoryclient
        {
          path: '/categ/animals', children: [
            { index: true, element: <ProtectedRoutes>  <Component.AnimalCat /> </ProtectedRoutes> },
            { path: 'addAnimal', element: <ProtectedRoutes> <Component.AddAnimalCat /></ProtectedRoutes> },
            { path: 'editAnimal/:id', element: <ProtectedRoutes>  <Component.EditAnimalCat /> </ProtectedRoutes> },
          ]
        },
        // ToDo :: Locations
        {
          path: '/location', children: [
            {
              path: 'country',children: [
                {index:true, element: <ProtectedRoutes> <Component.Country /></ProtectedRoutes>},
                { path: 'addcountry', element: <ProtectedRoutes> <Component.AddCountry /></ProtectedRoutes> },
                { path: 'editcountry/:id', element: <ProtectedRoutes>  <Component.EditCountry /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cities',  children: [
                {index:true, element: <ProtectedRoutes>  <Component.Cities /> </ProtectedRoutes>},
                { path: 'addcity', element: <ProtectedRoutes>  <Component.AddCities /> </ProtectedRoutes> },
                { path: 'editcity/:id', element: <ProtectedRoutes>  <Component.EditCities /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'areas', children: [
                {index:true, element: <ProtectedRoutes>  <Component.Areas /> </ProtectedRoutes>, },
                { path: 'addareas', element: <ProtectedRoutes>  <Component.AddAreas /> </ProtectedRoutes> },
                { path: 'editareas/:id', element: <ProtectedRoutes>  <Component.EditArea /> </ProtectedRoutes> },
              ]
            },
          ]
        },
        // ToDo :: settings
        {
          path: '/settings', children: [
            {
              path: 'general',children: [
                {index:true, element: <ProtectedRoutes> <Component.GeneralSettings /></ProtectedRoutes>},
              ]
            }
          ]
        },
        // ToDo :: Medical Fields
        {
          path: '/medicalfields', children: [
            { index: true, element: <ProtectedRoutes><Component.MedicalFields    /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes> <Component.AddMedicalFields   /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes> <Component.EditMedicalFields   /></ProtectedRoutes> },
 
          ]
        },
        // ToDo :: Ads
        {
          path: '/ads', children: [
            { index: true, element: <ProtectedRoutes><Component.AdsList    /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes> <Component.AddAds   /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes> <Component.EditAds   /></ProtectedRoutes> },
 
          ]
        },
        // ToDO :: Blogs
        {
          path: '/blogs', children: [
            {
              path:'client',children:[
                {index:true,element:<ProtectedRoutes> <Component.BlogClient/> </ProtectedRoutes>},
                {path:'details/:id',element:<ProtectedRoutes><Component.BlogClientDetails/></ProtectedRoutes>}
              ]
            }, 
            {
              path:'doctor',children:[
                {index:true,element:<ProtectedRoutes> <Component.BlogDoctor/> </ProtectedRoutes>},
                {path:'details/:id',element:<ProtectedRoutes><Component.BlogDoctorDetails/></ProtectedRoutes>}
              ]
            }, 
          ]
        },
        // ToDO :: consult
        {
          path: '/consult', children: [
            { index:true, element: <ProtectedRoutes> <Component.ChatConsult /> </ProtectedRoutes> },
            { path: 'chat/:id', element: <ProtectedRoutes> <Component.LiveConsult /> </ProtectedRoutes> }
          ]
        },
      ],
    },

    {
      path: '/chat', element: <Component.Chat />, children: [
        { index: true, element: <ProtectedRoutes>  <Component.ChatClient /></ProtectedRoutes> },
        {
          path: '/chat/clients', element: <ProtectedRoutes>  <Component.ChatClient /></ProtectedRoutes>, children: [
            { path: '/chat/clients/:id', element: <ProtectedRoutes> <Component.LiveChat /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/chat/doctors', element: <ProtectedRoutes>  <Component.ChatDoctors /></ProtectedRoutes>, children: [
            { path: '/chat/doctors/:id', element: <ProtectedRoutes> <Component.LiveChatDoc /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/chat/consult', children: [
            { index:true, element: <ProtectedRoutes> <Component.ChatConsult /> </ProtectedRoutes> },
            { path: 'details/:id', element: <ProtectedRoutes> <Component.LiveConsult /> </ProtectedRoutes> }
          ]
        },
        { path: '*', element: <h1>test</h1> }
      ],
    },

    {
      path: '/auth/', element: <Component.Auth />, children: [
        { path: 'login', element: <Component.Login /> },
      ]
    }

  ])
  return (
    <div>
      
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: ' Arial, Helvetica, sans-serif',
            textTransform: 'capitalize',
      /*       zIndex: '9999',
            background: '#fff',
            color: '#000', */
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
        containerStyle={{
          top: 60
        }}
      />
      <ChatStore>
        <VenderContext>
          <RouterProvider router={root} />
        </VenderContext>
      </ChatStore>

    </div>
  );
}

export default App;


// shazly