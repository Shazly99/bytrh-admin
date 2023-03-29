import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import './style/App.scss';
import VenderContext, { VendersContext } from './context/Store';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'; 
import ChatStore from './context/ChatStore';

function App() {
  let { LogOut, isLang, setIsLang } = useContext(VendersContext);

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
            { index: true , element: <ProtectedRoutes>  <Component.Users /> </ProtectedRoutes> },
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
            { index: true, element: <ProtectedRoutes><Component.Doctors /> </ProtectedRoutes> },
            { path: 'addDoctor', element: <ProtectedRoutes> <Component.AddDoctor fetchCountriesBytra={fetchCountriesBytra} /></ProtectedRoutes> },
            { path: 'editDoctor/:id', element: <ProtectedRoutes> <Component.EditDoctor fetchCountriesBytra={fetchCountriesBytra} /></ProtectedRoutes> },
            { path: 'doctorfields/:id', element: <ProtectedRoutes> <Component.DoctorFields /></ProtectedRoutes> },
            { path: 'doctorCategory/:id', element: <ProtectedRoutes> <Component.DoctorCategory /></ProtectedRoutes> },
            { path: 'doctorProfile/:id', element: <ProtectedRoutes> <Component.DoctorProfile /></ProtectedRoutes> },
            { path: 'doctorHours/:id', element: <ProtectedRoutes> <Component.DoctorHours /></ProtectedRoutes> },
            { path: 'addDoctorHours/:id', element: <ProtectedRoutes> <Component.AddDoctorHours /></ProtectedRoutes> },
          ]
        },

        //  ! Rashed Adoption component
        {
          path: '/adoption', children: [
            { index: true, element: <ProtectedRoutes><Component.Adoption /> </ProtectedRoutes> },
            { path: 'details/:id', element: <ProtectedRoutes> <Component.AdoptionDetails /></ProtectedRoutes> },
            { path: 'chat/:id', element: <ProtectedRoutes> <Component.AdoptionChat /></ProtectedRoutes> },
          ]

        },

        // ToDo user profile
        { path: '/profile', element: <ProtectedRoutes>  <Component.Profile /></ProtectedRoutes> },
        { path: '/contact', element: <ProtectedRoutes>  <Component.Contact /></ProtectedRoutes> },
        // ToDo Animals   
        {
          path: '/animals', children: [
            {
              path: 'categories', children: [
                { index: true, element: <ProtectedRoutes> <Component.AnimalCat /></ProtectedRoutes> },
                { path: 'addAnimal', element: <ProtectedRoutes> <Component.AddAnimalCat /></ProtectedRoutes> },
                { path: 'editAnimal/:id', element: <ProtectedRoutes>  <Component.EditAnimalCat /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'subcategories', children: [
                { index: true, element: <ProtectedRoutes>  <Component.AnimalsSubCategories /> </ProtectedRoutes> },
                { path: 'addsubcategories', element: <ProtectedRoutes>  <Component.AddAnimalsSubCategories /> </ProtectedRoutes> },
                { path: 'editsubcategories/:id', element: <ProtectedRoutes>  <Component.EditAnimalsSubCategories /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cutting', children: [
                { index: true, element: <ProtectedRoutes>  <Component.AnimalsCutting /> </ProtectedRoutes>, },
                { path: 'addcutting', element: <ProtectedRoutes>  <Component.AddAnimalsCutting /> </ProtectedRoutes> },
                { path: 'editcutting/:id', element: <ProtectedRoutes>  <Component.EditAnimalsCutting /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'bagging', children: [
                { index: true, element: <ProtectedRoutes>  <Component.Bagging /> </ProtectedRoutes>, },
                { path: 'addbagging', element: <ProtectedRoutes>  <Component.AddBagging /> </ProtectedRoutes> },
                { path: 'editbagging/:id', element: <ProtectedRoutes>  <Component.EditBagging /> </ProtectedRoutes> },
              ]
            },

            {
              path: 'baggingprice', children: [
                { index: true, element: <ProtectedRoutes>  <Component.BaggingPricing /> </ProtectedRoutes>, },
                { path: 'addbaggingprice', element: <ProtectedRoutes>  <Component.AddBaggingPricing /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cuttingprice', children: [
                { index: true, element: <ProtectedRoutes>  <Component.CuttingPricing /> </ProtectedRoutes>, },
                { path: 'addcuttingprice', element: <ProtectedRoutes>  <Component.AddCuttingPricing /> </ProtectedRoutes> },
              ]
            },

          ]
        },
        {
          path: '/store', children: [
            { index: true, element: <ProtectedRoutes>  <Component.StoreList /></ProtectedRoutes> },
            {
              path: 'details/:id', children: [
                { index: true, element: <ProtectedRoutes>  <Component.StoreDetails /></ProtectedRoutes> },
                { path: 'chat/:id', element: <ProtectedRoutes>  <Component.StoreChatDetails /></ProtectedRoutes> }
              ]
            }
          ]
        },
        {
          path: '/bidding', children: [
            { index: true, element: <ProtectedRoutes>  <Component.Bidding /></ProtectedRoutes> },
            {
              path: 'details/:id', children: [
                { index: true, element: <ProtectedRoutes>  <Component.BiddingDetails /></ProtectedRoutes> },
                { path: 'chat/:id', element: <ProtectedRoutes>  <Component.StoreChatDetails /></ProtectedRoutes> }
              ]
            }
          ]
        },
        // ** :: Locations
        {
          path: '/location', children: [
            {
              path: 'country', children: [
                { index: true, element: <ProtectedRoutes> <Component.Country /></ProtectedRoutes> },
                { path: 'addcountry', element: <ProtectedRoutes> <Component.AddCountry /></ProtectedRoutes> },
                { path: 'editcountry/:id', element: <ProtectedRoutes>  <Component.EditCountry /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cities', children: [
                { index: true, element: <ProtectedRoutes>  <Component.Cities /> </ProtectedRoutes> },
                { path: 'addcity', element: <ProtectedRoutes>  <Component.AddCities /> </ProtectedRoutes> },
                { path: 'editcity/:id', element: <ProtectedRoutes>  <Component.EditCities /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'areas', children: [
                { index: true, element: <ProtectedRoutes>  <Component.Areas /> </ProtectedRoutes>, },
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
              path: 'general', children: [
                { index: true, element: <ProtectedRoutes> <Component.GeneralSettings /></ProtectedRoutes> },
              ]
            }
          ]
        },
        // ToDo :: Medical Fields
        {
          path: '/medicalfields', children: [
            { index: true, element: <ProtectedRoutes><Component.MedicalFields /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes> <Component.AddMedicalFields /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes> <Component.EditMedicalFields /></ProtectedRoutes> },

          ]
        },
        // ToDo :: Ads
        {
          path: '/ads', children: [
            { index: true, element: <ProtectedRoutes><Component.AdsList /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes> <Component.AddAds /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes> <Component.EditAds /></ProtectedRoutes> },

          ]
        },
        // ToDO :: Blogs
        {
          path: '/blogs', children: [
            {
              path: 'client', children: [
                { index: true, element: <ProtectedRoutes> <Component.BlogClient /> </ProtectedRoutes> },
                { path: 'details/:id', element: <ProtectedRoutes><Component.BlogClientDetails /></ProtectedRoutes> }
              ]
            },
            {
              path: 'doctor', children: [
                { index: true, element: <ProtectedRoutes> <Component.BlogDoctor /> </ProtectedRoutes> },
                { path: 'details/:id', element: <ProtectedRoutes><Component.BlogDoctorDetails /></ProtectedRoutes> }
              ]
            },
          ]
        },
        // ToDO :: consult
        {
          path: '/consult', children: [
            { index: true, element: <ProtectedRoutes> <Component.ChatConsult /> </ProtectedRoutes> },
            { path: 'chat/:id', element: <ProtectedRoutes> <Component.LiveConsult /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/visits', children: [
            { index: true, element: <ProtectedRoutes><Component.Visits /> </ProtectedRoutes> }, 
            { path: 'details/:id', element: <ProtectedRoutes><Component.VisitDetails /> </ProtectedRoutes> }, 
          ]
        },
        {
          path: '/consultTime', children: [
            { index: true, element: <ProtectedRoutes><Component.ConsultTime /> </ProtectedRoutes> }, 
            { path: 'add', element: <ProtectedRoutes><Component.AddConsultTime /> </ProtectedRoutes> }
          ]
        },
        {
          path: '*', element: <Component.Error />
        }
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
            { index: true, element: <ProtectedRoutes> <Component.ChatConsult /> </ProtectedRoutes> },
            { path: 'details/:id', element: <ProtectedRoutes> <Component.LiveConsult /> </ProtectedRoutes> }
          ]
        },
        {
          path: '*', element: <Component.Error />
        }
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
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: ' Arial, Helvetica, sans-serif',
            textTransform: 'capitalize',
            zIndex: '9999',
       /*      background: '#000',
            color: '#fff', */
            borderRadius: '10px',
            boxShadow:'10px 10px 10px rgba(188, 188, 188, 0.16)',
             
            
             background: '#fff',
             color: '#000',
          },
        }}
        containerStyle={{
          bottom: 50
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