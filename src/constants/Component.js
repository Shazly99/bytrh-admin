import Client from '../Layout/Client.jsx';
import Vendor from '../Layout/Vendor';
import Dashboard from './../Pages/Vendor/Dashboard/Dashboard.jsx';
import DashboardClient from './../Pages/Client/Dashbord/Dashbord.jsx';
import Orders from './../Pages/Vendor/Orders/Orders.jsx';
import Users from './../Pages/Vendor/Users/Users';
import Profile from './../Pages/Vendor/Profile/Profile';
import SubUsers from './../Pages/Vendor/SubUsers/SubUsers';
import Navber from './../Components/Navber/Navber';
import Sildebar from './../Components/Sidebar/Sildebar';
import ButtonBase from './../Components/Button/ButtonBase';
import UsersTable from './../Pages/Vendor/Users/UsersTable';  
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
import Auth from './../Layout/Auth';
import Login from './../Pages/auth/Login/Login';
import AddNewUser from '../Pages/Vendor/Users/AddUser/AddNewUser';
import Edit from './../Pages/Vendor/Users/Edit/Edit';
import ClientTable from './../Pages/Vendor/Client/ClientTable';
import Clients from './../Pages/Vendor/Client/Client';

export default {
    // Layout
    Client,
    Vendor,
    Auth,
    // Vendor Components User 1
    Dashboard,
    Summary,
    LastOrder,
    ChartColumn,
    ChartLine,
    Orders, 
    AddNewUser,
    UserTable,
    Users,
    UsersTable,
    AddUser, 
    Profile,
    SubUsers,
    Edit,
    Clients,
    ClientTable,
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
    // Auth
    Login,
    
    // Components
    Navber,
    SubNav,
    Sildebar,
    SideClient,
    ButtonBase,
    BaseHeader
}

