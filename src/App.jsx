import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import './style/App.scss';
import VenderContext  from './context/Store';

function App() {

  const root = createBrowserRouter([
    {
      path: '/', element: <Component.Vendor />, children: [
        { index: true, element: <Component.Dashboard /> },
        {
          path: '/venderProducts', children: [
            { index: true, element: <Component.Products /> },
            { path: 'addProduct', element: <Component.AddProducts /> },
          ]
        },

        {
          path: '/venderOrder', element: <Component.Orders />
        },

        {
          path: '/venderSubuser', children: [
            { index: true, element: <Component.SubUsers /> },
            { path: 'addUser', element: <Component.AddUser /> },
          ]
        },

        { path: '/venderProfile', element: <Component.Profile /> },
      ],
    },
    {
      path: '/client/', element: <Component.Client />, children: [
        { index: true, element: <Component.DashboardClient /> },
        { path: 'productsCatalog', element: <Component.ProductsCatalog /> },
        { path: 'productList', element: <Component.ProductsList /> },
        { path: 'orders', element: <Component.OrdersClient /> },
        {
          path: 'reports', children: [
            { index: true, element: <Component.Reports /> },
            { path: 'orders', element: <Component.OrdersReport /> },
            { path: 'customers', element: <Component.Customer /> },
            { path: 'products', element: <Component.ProductReport /> },
          ]
        },
        { path: 'profile', element: <Component.ProfileClient /> },

      ]
    }
  ])
  return (
    <div>
      <VenderContext>
        <RouterProvider router={root} />
      </VenderContext>
    </div>
  );
}

export default App;


// shazly