import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import './style/App.scss';
import VenderContext  from './context/Store';
import { Toaster } from 'react-hot-toast';

function App() { 

  function ProtectedRoutes({ children }) {
    if (localStorage.getItem('token')) {
      return children
    } else {
      return <Navigate to="/auth/login" replace={true} />

    }
  } 
  const root = createBrowserRouter([
    {
      path: '/', element: <Component.Vendor   />, children: [
        { index: true, element:<ProtectedRoutes>  <Component.Dashboard /></ProtectedRoutes>    },
        {
          path: '/venderProducts', children: [
            { index: true, element:<ProtectedRoutes>  <Component.Products /> </ProtectedRoutes>},
            { path: 'addProduct', element: <ProtectedRoutes> <Component.AddProducts /></ProtectedRoutes> },
          ]
        },

        {
          path: '/venderOrder', element:<ProtectedRoutes>  <Component.Orders /> </ProtectedRoutes>
        },

        {
          path: '/venderSubuser', children: [
            { index: true, element:<ProtectedRoutes> <Component.SubUsers /></ProtectedRoutes> },
            { path: 'addUser', element:<ProtectedRoutes>  <Component.AddUser /> </ProtectedRoutes> },
          ]
        },

        { path: '/venderProfile', element:<ProtectedRoutes>  <Component.Profile /></ProtectedRoutes> },
      ],
    },
    // {
    //   path: '/client/', element: <Component.Client />, children: [
    //     { index: true, element: <Component.DashboardClient /> },
    //     { path: 'productsCatalog', element: <Component.ProductsCatalog /> },
    //     { path: 'productList', element: <Component.ProductsList /> },
    //     { path: 'orders', element: <Component.OrdersClient /> },
    //     {
    //       path: 'reports', children: [
    //         { index: true, element: <Component.Reports /> },
    //         { path: 'orders', element: <Component.OrdersReport /> },
    //         { path: 'customers', element: <Component.Customer /> },
    //         { path: 'products', element: <Component.ProductReport /> },
    //       ]
    //     },
    //     { path: 'profile', element: <Component.ProfileClient /> },

    //   ]
    // },
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