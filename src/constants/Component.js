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
import AnimalCat from './../Pages/Vendor/Categories/AnimalCat';
import AddAnimalCat from './../Pages/Vendor/Categories/AddAnimalCat';
import EditAnimalCat from './../Pages/Vendor/Categories/EditAnimalCat'; 
import Cities from './../Pages/Vendor/Location/Cities/Cities';
import AddCities from './../Pages/Vendor/Location/Cities/AddCities';
import EditCities from './../Pages/Vendor/Location/Cities/EditCities';
import Areas from './../Pages/Vendor/Location/Areas/Areas';
import AddAreas from './../Pages/Vendor/Location/Areas/AddAreas';
import Country from './../Pages/Vendor/Location/Country/Country';
import AddCountry from './../Pages/Vendor/Location/Country/AddCountry';
import EditCountry from './../Pages/Vendor/Location/Country/EditCountry';
import EditArea from './../Pages/Vendor/Location/Areas/EditArea'; 
import ChatConsult from './../Pages/Chat/Consult/ChatConsult';
import LiveConsult from './../Pages/Chat/Consult/LiveConsult';

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
 
    ChatConsult,
    LiveConsult,
    // Doc
    Doctors,
    AddDoctor,
    EditDoctor,
    DoctorFields,
    //AnimalCat
    AnimalCat, 
    AddAnimalCat,
    EditAnimalCat,
    // location
    Country,
    AddCountry,
    EditCountry,
    Cities,
    AddCities,
    EditCities,
    Areas,
    AddAreas,
    EditArea,
    // Components
    Navber,
    SubNav,
    Sildebar, 
    ButtonBase,
    BaseHeader
}

