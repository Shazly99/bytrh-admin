import Vendor from '../Layout/Vendor';
import Dashboard from './../Pages/Vendor/Dashboard/Dashboard.jsx'; 
import Users from './../Pages/Vendor/Users/Users';
import Profile from './../Pages/Vendor/Profile/Profile'; 
import Navber from './../Components/Navber/Navber';
import Sildebar from './../Components/Sidebar/Sildebar';
import ButtonBase from './../Components/Button/ButtonBase';
import UsersTable from './../Pages/Vendor/Users/UsersTable';  
import SubNav from './../Components/Navber/SubNav';
import BaseHeader from './../Components/Header/BaseHeader'; 
import Summary from './../Pages/Vendor/Dashboard/Summary'; 
import ChartColumn from '../Pages/Vendor/Dashboard/ChartColumn';
import ChartLine from './../Pages/Vendor/Dashboard/ChartLine';//
import Auth from './../Layout/Auth';
import Login from './../Pages/auth/Login/Login';
import AddNewUser from '../Pages/Vendor/Users/AddUser/AddNewUser';
import Edit from './../Pages/Vendor/Users/Edit/Edit';
import ClientTable from './../Pages/Vendor/Client/ClientTable';
import Clients from './../Pages/Vendor/Client/Client';
import Chat from './../Layout/Chat';
import ChatClient from './../Pages/Chat/Client/ChatClient';
import ChatDoctors from './../Pages/Chat/Doctors/ChatDoctors';
import Doctors from './../Pages/Vendor/Doctor/Doctors';
import AddDoctor from './../Pages/Vendor/Doctor/AddDoctor';
import EditDoctor from './../Pages/Vendor/Doctor/EditDoctor';
import DoctorFields from './../Pages/Vendor/Doctor/DoctorFields';
import ClientList from './../Pages/Chat/Client/ClientList';
import LiveChat from './../Pages/Chat/Client/LiveChat';
import DoctorList from './../Pages/Chat/Doctors/DoctorList';
import LiveChatDoc from './../Pages/Chat/Doctors/LiveChatDoc';

export default {
    // Layout 
    Vendor,
    Auth,
    Chat,

    // Vendor Components User 1
    Dashboard,
    Summary,
    ChartColumn,
    ChartLine,
    AddNewUser,
    Users,
    UsersTable,
    Profile,
    Edit,
    Clients,
    ClientTable, 

    // Auth
    Login,

    // chat component
    ChatClient,
    ClientList,
    LiveChat,
    
    ChatDoctors,
    DoctorList,
    LiveChatDoc, 
    // Doc
    Doctors,
    AddDoctor,
    EditDoctor,
    DoctorFields,

    // Components
    Navber,
    SubNav,
    Sildebar, 
    ButtonBase,
    BaseHeader
}

