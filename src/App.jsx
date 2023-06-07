import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import ChatStore from './context/ChatStore';
import VenderContext from './context/Store';
import './style/App.scss';

function App() {

  function ProtectedRoutes({ children, allowedRoles }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('Role');

    if (!token) {
      return <Navigate to="/admin/login" replace={true} />
    }

    if (allowedRoles?.includes(role)) {
      return children;
    }

    // Default to showing an error message if the user's role is not allowed
    return (
      <Component.InvalidRole />
    );
  }
  const root = createBrowserRouter([

    {
      path: '', element: <Component.Vendor />, children: [
        { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.Dashboard /></ProtectedRoutes> },
        // ?User 
        {
          path: '/user', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.Users /> </ProtectedRoutes> },
            { path: 'addUser', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.AddNewUser /></ProtectedRoutes> },
            { path: 'editUser/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.Edit /> </ProtectedRoutes> },
          ]
        },
        // ?client
        {
          path: '/client', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.Clients /> </ProtectedRoutes> },
          ]
        },
        // ! Rashed Doctor component
        {
          path: '/doctors', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.Doctors /> </ProtectedRoutes> },
            { path: 'addDoctor', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.AddDoctor /></ProtectedRoutes> },
            { path: 'editDoctor/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.EditDoctor /></ProtectedRoutes> },
            { path: 'doctorfields/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.DoctorFields /></ProtectedRoutes> },
            { path: 'doctorCategory/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.DoctorCategory /></ProtectedRoutes> },
            { path: 'doctorProfile/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.DoctorProfile /></ProtectedRoutes> },
            { path: 'doctorHours/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.DoctorHours /></ProtectedRoutes> },
            { path: 'addDoctorHours/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.AddDoctorHours /></ProtectedRoutes> },
            {
              path: 'Service', children: [
                { path: 'list/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.DoctorService /> </ProtectedRoutes>, },
                { path: 'add/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.AddDoctorService /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'document', children: [
                { path: 'add/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.AddDoctorDocuments /> </ProtectedRoutes>, },
                { path: 'edit/:idDoc/:idDocument', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.EditDoctorDocuments /> </ProtectedRoutes> },
              ]
            },
            { path: 'withdraw/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.Withdraw /></ProtectedRoutes> },


          ]
        },
        {
          path: '/doctor', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.DoctorService /> </ProtectedRoutes>, },
            { path: 'addbaggingprice', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.AddDoctorService /> </ProtectedRoutes> },
          ]
        },
        //  ! Rashed Adoption component
        {
          path: '/adoption', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.Adoption allowedRoles={['1']} /> </ProtectedRoutes> },
            { path: 'details/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.AdoptionDetails allowedRoles={['1']} /></ProtectedRoutes> },
            { path: 'chat/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.AdoptionChat allowedRoles={['1']} /></ProtectedRoutes> },
          ]

        },

        // ToDo user profile

        { path: '/mcprofile', element: <ProtectedRoutes allowedRoles={['2']} >  <Component.MCProfile /></ProtectedRoutes> },
        { path: '/profile', element: <ProtectedRoutes allowedRoles={['1', '2']}>  <Component.Profile /></ProtectedRoutes> },
        { path: '/contact', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.Contact /></ProtectedRoutes> },

        // ToDo Animals   
        {
          path: '/animals', children: [
            {
              path: 'categories', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}> <Component.AnimalCat /></ProtectedRoutes> },
                { path: 'addAnimal', element: <ProtectedRoutes allowedRoles={['1']}> <Component.AddAnimalCat /></ProtectedRoutes> },
                { path: 'editAnimal/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditAnimalCat /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'subcategories', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AnimalsSubCategories /> </ProtectedRoutes> },
                { path: 'addsubcategories', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddAnimalsSubCategories /> </ProtectedRoutes> },
                { path: 'editsubcategories/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditAnimalsSubCategories /> </ProtectedRoutes> },
              ]
            },

            {
              path: 'adoptionsSubcategories', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AdoptionsAnimals /> </ProtectedRoutes> },
                { path: 'addsubcategories', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddAdoptionsAnimals /> </ProtectedRoutes> },
                { path: 'editsubcategories/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditAdoptionsAnimals /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cutting', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AnimalsCutting /> </ProtectedRoutes>, },
                { path: 'addcutting', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddAnimalsCutting /> </ProtectedRoutes> },
                { path: 'editcutting/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditAnimalsCutting /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'bagging', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.Bagging /> </ProtectedRoutes>, },
                { path: 'addbagging', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddBagging /> </ProtectedRoutes> },
                { path: 'editbagging/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditBagging /> </ProtectedRoutes> },
              ]
            },

            {
              path: 'baggingprice', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.BaggingPricing /> </ProtectedRoutes>, },
                { path: 'addbaggingprice', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddBaggingPricing /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cuttingprice', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.CuttingPricing /> </ProtectedRoutes>, },
                { path: 'addcuttingprice', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddCuttingPricing /> </ProtectedRoutes> },
              ]
            },

          ]
        },
        {
          path: '/store', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.StoreList /></ProtectedRoutes> },
            {
              path: 'details/:id', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.StoreDetails /></ProtectedRoutes> },
                { path: 'chat/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.StoreChatDetails /></ProtectedRoutes> }
              ]
            }
          ]
        },
        {
          path: '/bidding', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.Bidding /></ProtectedRoutes> },
            {
              path: 'details/:id', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.BiddingDetails /></ProtectedRoutes> },
                { path: 'chat/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.StoreChatDetails /></ProtectedRoutes> }
              ]
            }
          ]
        },
        // ** :: Locations
        {
          path: '/location', children: [
            {
              path: 'country', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}> <Component.Country /></ProtectedRoutes> },
                { path: 'addcountry', element: <ProtectedRoutes allowedRoles={['1']}> <Component.AddCountry /></ProtectedRoutes> },
                { path: 'editcountry/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditCountry /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'cities', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.Cities /> </ProtectedRoutes> },
                { path: 'addcity', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddCities /> </ProtectedRoutes> },
                { path: 'editcity/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditCities /> </ProtectedRoutes> },
              ]
            },
            {
              path: 'areas', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.Areas /> </ProtectedRoutes>, },
                { path: 'addareas', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.AddAreas /> </ProtectedRoutes> },
                { path: 'editareas/:id', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.EditArea /> </ProtectedRoutes> },
              ]
            },
          ]
        },
        // ToDo :: settings
        {
          path: '/settings', children: [
            {
              path: 'general', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}> <Component.GeneralSettings /></ProtectedRoutes> },
              ]
            }
          ]
        },
        // ToDo :: Medical Fields
        {
          path: '/medicalfields', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.MedicalFields /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes allowedRoles={['1']}> <Component.AddMedicalFields /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.EditMedicalFields /></ProtectedRoutes> },

          ]
        },
        // ToDo :: Ads
        {
          path: '/ads', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.AdsList /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes allowedRoles={['1']}> <Component.AddAds /></ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.EditAds /></ProtectedRoutes> },

          ]
        },
        // ToDO :: Blogs
        {
          path: '/blogs', children: [
            {
              path: 'client', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.BlogClient /> </ProtectedRoutes> },
                { path: 'details/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.BlogClientDetails /></ProtectedRoutes> }
              ]
            },
            {
              path: 'doctor', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.BlogDoctor /> </ProtectedRoutes> },
                { path: 'details/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.BlogDoctorDetails /></ProtectedRoutes> }
              ]
            },
          ]
        },
        // ToDO :: consult
        {
          path: '/consult', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.ChatConsult /> </ProtectedRoutes> },
            { path: 'chat/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}> <Component.LiveConsult /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/visits', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.Visits /> </ProtectedRoutes> },
            { path: 'details/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.VisitDetails /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/services', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.Services /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.AddService /> </ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.EditService /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/consultTime', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.ConsultTime /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes allowedRoles={['1']}><Component.AddConsultTime /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/doctorfree', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.DoctorFreeList /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/doctor', children: [
            { path: 'request', element: <ProtectedRoutes allowedRoles={['1', '2']}><Component.DoctorRequest /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/request', children: [
            { index:true, element: <ProtectedRoutes allowedRoles={['1' ]}><Component.Requests /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/medicalcenter', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.Centers /> </ProtectedRoutes> },
            { path: 'profile/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.ProfileCenter /> </ProtectedRoutes> },
            { path: 'edit/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.CenterEdit /> </ProtectedRoutes> },
            // { path: 'docs/:id', element: <ProtectedRoutes allowedRoles={['1' ]}><Component.CenterEdit /> </ProtectedRoutes> },
            { path: 'add/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.CenterAdd /> </ProtectedRoutes> },
            { path: 'hours/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.CenterHours /> </ProtectedRoutes> },
            { path: 'addHours/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.AddHours /> </ProtectedRoutes> },

          ]
        },
        {
          path: '/docs', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['2']}><Component.Docs /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes allowedRoles={['2']}><Component.AddDocs /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/hours', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['2']}><Component.MCHours /> </ProtectedRoutes> },
            { path: 'add', element: <ProtectedRoutes allowedRoles={['2']}><Component.AddMCHour /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/reports', children: [
            {
              path: 'doctors', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}> <Component.ReportsDoctors /> </ProtectedRoutes>, },
                { path: 'doctorTransactionsDetails/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.DoctorTransactionsDetails /> </ProtectedRoutes> },
              ]
            },

            {
              path: 'clients', children: [
                { index: true, element: <ProtectedRoutes allowedRoles={['1']}> <Component.ReportsClients /> </ProtectedRoutes>, },
                { path: 'clientTransactionsDetails/:id', element: <ProtectedRoutes allowedRoles={['1']}><Component.ClientTransactionsDetails /> </ProtectedRoutes> },
              ]
            }, 
          ]
        },
        {
          path: '/visitsreports', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.VisitsReports /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/consultsreports', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.ConsultsReports /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/salesreports', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.SalesReports /> </ProtectedRoutes> },
          ]
        },
        {
          path: '/biddingreports', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}><Component.BiddingReports /> </ProtectedRoutes> },
          ]
        },
        {
          path: '*', element: <Component.Error />
        }
      ],
    },
    {
      path: '/chat', element: <Component.Chat />, children: [
        { index: true, element: <ProtectedRoutes allowedRoles={['1']}>  <Component.ChatClient /></ProtectedRoutes> },
        {
          path: '/chat/clients', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.ChatClient /></ProtectedRoutes>, children: [
            { path: '/chat/clients/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.LiveChat /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/chat/doctors', element: <ProtectedRoutes allowedRoles={['1']}>  <Component.ChatDoctors /></ProtectedRoutes>, children: [
            { path: '/chat/doctors/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.LiveChatDoc /> </ProtectedRoutes> }
          ]
        },
        {
          path: '/chat/consult', children: [
            { index: true, element: <ProtectedRoutes allowedRoles={['1']}> <Component.ChatConsult /> </ProtectedRoutes> },
            { path: 'details/:id', element: <ProtectedRoutes allowedRoles={['1']}> <Component.LiveConsult /> </ProtectedRoutes> }
          ]
        },
        {
          path: '*', element: <Component.Error />
        }
      ],
    },
    {
      path: '/admin/', element: <Component.Auth />, children: [
        { path: 'login', element: <Component.Login /> },
      ]
    },
    {
      path: '/medicalcenter/', element: <Component.Auth />, children: [
        { path: 'login', element: <Component.LoginMedicalCenter /> },
        { path: 'register', element: <Component.Register /> },
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
            // background: '#000',
            // color: '#fff',
            borderRadius: '10px',
            boxShadow: '10px 10px 10px rgba(188, 188, 188, 0.16)',
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