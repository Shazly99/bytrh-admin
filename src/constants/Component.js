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
import DoctorCategory from './../Pages/Vendor/Doctor/DoctorCategory';
import DoctorProfile from '../Pages/Vendor/Doctor/DoctorProfile';
import DoctorHours from '../Pages/Vendor/Doctor/DoctorHours';
import SingleHour from '../Pages/Vendor/Doctor/SingleHour';
import AddDoctorHours from '../Pages/Vendor/Doctor/AddDoctorHours';
import ClientList from './../Pages/Chat/Client/ClientList';
import LiveChat from './../Pages/Chat/Client/LiveChat';
import DoctorList from './../Pages/Chat/Doctors/DoctorList';
import LiveChatDoc from './../Pages/Chat/Doctors/LiveChatDoc';
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
import GeneralSettings from './../Pages/Settings/General/GeneralSettings';
import MedicalFields from './../Pages/Vendor/MedicalFields/MedicalFields';
import AddMedicalFields from './../Pages/Vendor/MedicalFields/AddMedicalFields';
import EditMedicalFields from './../Pages/Vendor/MedicalFields/EditMedicalFields';
import AdsList from './../Pages/Ads/AdsList';
import AddAds from './../Pages/Ads/AddAds';
import EditAds from './../Pages/Ads/EditAds';
import BlogClient from './../Pages/Blogs/Client/BlogClient';
import { BlogDoctor } from './../Pages/Blogs/Doc/BlogDoctor';
import BlogClientDetails from './../Pages/Blogs/Client/BlogClientDetails';
import BlogDoctorDetails from './../Pages/Blogs/Doc/BlogDoctorDetails';
import Adoption from '../Pages/Vendor/Adoption/Adoption';
import AdoptionDetails from '../Pages/Vendor/Adoption/AdoptionDetails';
import Loader from './../Components/Shared/Loader/Loader';
import AdoptionChat from '../Pages/Vendor/Adoption/AdoptionChat';
import Contact from './../Pages/Contact/Contact';
import AnimalCat from './../Pages/Animals/Categories/AnimalCat';
import AddAnimalCat from './../Pages/Animals/Categories/AddAnimalCat';
import EditAnimalCat from './../Pages/Animals/Categories/EditAnimalCat';
import AnimalsSubCategories from './../Pages/Animals/SubCategories/AnimalsSubCategories';
import AddAnimalsSubCategories from './../Pages/Animals/SubCategories/AddAnimalsSubCategories';
import EditAnimalsSubCategories from './../Pages/Animals/SubCategories/EditAnimalsSubCategories';
import AnimalsCutting from './../Pages/Animals/Cutting/AnimalsCutting';
import AddAnimalsCutting from './../Pages/Animals/Cutting/AddAnimalsCutting';
import EditAnimalsCutting from './../Pages/Animals/Cutting/EditAnimalsCutting';
import Bagging from './../Pages/Animals/Bagging/Bagging';
import AddBagging from './../Pages/Animals/Bagging/AddBagging';
import EditBagging from './../Pages/Animals/Bagging/EditBagging';
import BaggingPricing from './../Pages/Animals/BaggingPricing/BaggingPricing';
import AddBaggingPricing from './../Pages/Animals/BaggingPricing/AddBaggingPricing';
import CuttingPricing from './../Pages/Animals/CuttingPricing/CuttingPricing';
import AddCuttingPricing from './../Pages/Animals/CuttingPricing/AddCuttingPricing';
import StoreList from './../Pages/Store/StoreList';
import StoreDetails from './../Pages/Store/StoreDetails';
import StoreChatDetails from './../Pages/Store/StoreChatDetails';
import Error from './../Components/Shared/NotFound/Error';
import Bidding from './../Pages/Bidding/Bidding';
import BiddingDetails from './../Pages/Bidding/BiddingDetails';
import BiddingRequests from './../Pages/Bidding/BiddingRequests';
import DataNotFound from './../Components/Shared/DataNotFound/DataNotFound';
import HandelDelete from './../Components/Shared/HandelDelete/HandelDelete';
import Visits from './../Pages/Visits/Visits';
import ConsultTime from './../Pages/ConsultTime/ConsultTime';
import SingleConsultTime from './../Pages/ConsultTime/SingleConsultTime';
import AddConsultTime from './../Pages/ConsultTime/AddConsultTime';
import VisitDetails from './../Pages/Visits/VisitDetails';
import Register from './../Pages/auth/MedicalCenter/Register/Register';
import LoginMedicalCenter from './../Pages/auth/MedicalCenter/Login/LoginMedicalCenter';
import DoctorFreeList from './../Pages/MedicalCenter/DoctorFree/DoctorFreeList';
import InvalidRole from './../Components/Shared/InvalidRole/InvalidRole';
 
const Component= {
    // Layout 
    Vendor,
    Auth,
    Chat,
    Loader,
    Contact,
    // Vendor Components User 1
    Dashboard,
    Summary,
    ChartColumn,
    ChartLine,
    AddNewUser,
    InvalidRole,
    Users,
    UsersTable,
    Profile,
    Edit,
    Clients,
    ClientTable,

    // Auth
    Login,
    Register,
    LoginMedicalCenter,
    // chat component
    ChatClient,
    ClientList,
    LiveChat,
    // MedicalFields
    MedicalFields,
    AddMedicalFields,
    EditMedicalFields,
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
    DoctorCategory,
    DoctorProfile,
    DoctorHours,
    SingleHour,
    AddDoctorHours,

    //AnimalCat
    AnimalCat,
    AddAnimalCat,
    EditAnimalCat,
    AnimalsSubCategories,
    AddAnimalsSubCategories,
    EditAnimalsSubCategories,
    AnimalsCutting,
    AddAnimalsCutting,
    EditAnimalsCutting,
    Bagging,
    AddBagging,
    EditBagging,
    BaggingPricing,
    AddBaggingPricing,
    CuttingPricing,
    AddCuttingPricing,
    // Store
    StoreList,
    StoreDetails,
    StoreChatDetails,
    // Bidding
    Bidding,
    BiddingDetails,
    BiddingRequests,

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
    // Blogs
    BlogClient,
    BlogDoctor,
    BlogClientDetails,
    BlogDoctorDetails,
    // Sitting
    GeneralSettings,
    // Advertisements
    AdsList,
    AddAds,
    EditAds,
    // Components
    Navber,
    SubNav,
    Sildebar,
    ButtonBase,
    BaseHeader,
    DataNotFound,
    // Adoption
    Adoption,
    AdoptionDetails,
    AdoptionChat,
    HandelDelete,
    Error,


    // Visits
    Visits,
    VisitDetails,
    // DoctorFree
    DoctorFreeList,
    // Consult Time
    ConsultTime,
    SingleConsultTime,
    AddConsultTime,
}

export default Component


