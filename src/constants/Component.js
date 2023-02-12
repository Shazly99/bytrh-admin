import Client from '../Layout/Client.jsx';
import Vendor from './../Layout/Vendor';
import Dashboard from './../Pages/Vendor/Dashboard/Dashboard.jsx';
import DashboardClient from './../Pages/Client/Dashbord/Dashbord.jsx';
import Orders from './../Pages/Vendor/Orders/Orders.jsx';
import Products from './../Pages/Vendor/Products/Products';
import Profile from './../Pages/Vendor/Profile/Profile';
import SubUsers from './../Pages/Vendor/SubUsers/SubUsers';
import Navber from './../Components/Navber/Navber';
import Sildebar from './../Components/Sidebar/Sildebar';
import ButtonBase from './../Components/Button/ButtonBase';
import ProductsTable from './../Pages/Vendor/Products/ProductsTable';
import AddProducts from './../Pages/Vendor/Products/AddProducts/AddProducts'; 
import SubNav from './../Components/Navber/SubNav';
import BaseHeader from './../Components/Header/BaseHeader';
import AddUser from './../Pages/Vendor/SubUsers/AddUser/AddUser';
import UserTable from './../Pages/Vendor/SubUsers/UserTable';
import Summary from './../Pages/Vendor/Dashboard/Summary';
import LastOrder from './../Pages/Vendor/Dashboard/LastOrder';
import ChartColumn from '../Pages/Vendor/Dashboard/ChartColumn';
import ChartLine from './../Pages/Vendor/Dashboard/ChartLine';
import OrdersClient from './../Pages/Client/Orders/Orders';
import ProductsCatalog from './../Pages/Client/ProductsCatalog/ProductsCatalog';
import ProductsList from './../Pages/Client/ProductsList/ProductsList';
import ProfileClient from './../Pages/Client/Profile/Profile.jsx';
import Reports from './../Pages/Client/Reports/Reports';
import Customer from './../Pages/Client/Reports/Customer/Customer';
import OrdersReport from './../Pages/Client/Reports/Orders/Orders';
import ProductReport from './../Pages/Client/Reports/Product/Product';
import SideClient from './../Components/Sidebar/sideclient/SideClient';

export default {
    // Layout
    Client,
    Vendor,
    // Vendor Components User 1
    Dashboard,
    Summary,
    LastOrder,
    ChartColumn,
    ChartLine,
    Orders, 
    AddUser,
    UserTable,
    Products,
    ProductsTable,
    AddProducts, 
    Profile,
    SubUsers,
    // Client Components user 2
    DashboardClient,
    OrdersClient,
    ProductsCatalog,
    ProductsList,
    ProfileClient,
    Reports,
    Customer,
    OrdersReport,
    ProductReport,

    // Components
    Navber,
    SubNav,
    Sildebar,
    SideClient,
    ButtonBase,
    BaseHeader
}

