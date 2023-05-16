import Vendor from '../Layout/Vendor';
import Adoption from '../Pages/Vendor/Adoption/Adoption';
import AdoptionChat from '../Pages/Vendor/Adoption/AdoptionChat';
import AdoptionDetails from '../Pages/Vendor/Adoption/AdoptionDetails'; 
import AddDoctorHours from '../Pages/Vendor/Doctor/AddDoctorHours';
import DoctorHours from '../Pages/Vendor/Doctor/DoctorHours';
import DoctorProfile from '../Pages/Vendor/Doctor/DoctorProfile';
import SingleHour from '../Pages/Vendor/Doctor/SingleHour';
import AddNewUser from '../Pages/Vendor/Users/AddUser/AddNewUser';
import ButtonBase from './../Components/Button/ButtonBase';
import BaseHeader from './../Components/Header/BaseHeader';
import Navber from './../Components/Navber/Navber';
import SubNav from './../Components/Navber/SubNav';
import Loader from './../Components/Shared/Loader/Loader';
import Sildebar from './../Components/Sidebar/Sildebar';
import Auth from './../Layout/Auth';
import Chat from './../Layout/Chat';
import AddAds from './../Pages/Ads/AddAds';
import AdsList from './../Pages/Ads/AdsList';
import EditAds from './../Pages/Ads/EditAds';
import BlogClient from './../Pages/Blogs/Client/BlogClient';
import BlogClientDetails from './../Pages/Blogs/Client/BlogClientDetails';
import { BlogDoctor } from './../Pages/Blogs/Doc/BlogDoctor';
import BlogDoctorDetails from './../Pages/Blogs/Doc/BlogDoctorDetails';
import ChatClient from './../Pages/Chat/Client/ChatClient';
import ClientList from './../Pages/Chat/Client/ClientList';
import LiveChat from './../Pages/Chat/Client/LiveChat';
import ChatConsult from './../Pages/Chat/Consult/ChatConsult';
import LiveConsult from './../Pages/Chat/Consult/LiveConsult';
import ChatDoctors from './../Pages/Chat/Doctors/ChatDoctors';
import DoctorList from './../Pages/Chat/Doctors/DoctorList';
import LiveChatDoc from './../Pages/Chat/Doctors/LiveChatDoc';
import GeneralSettings from './../Pages/Settings/General/GeneralSettings';
import Clients from './../Pages/Vendor/Client/Client';
import ClientTable from './../Pages/Vendor/Client/ClientTable'; 
import Dashboard from './../Pages/Vendor/Dashboard/Dashboard.jsx'; 
import AddDoctor from './../Pages/Vendor/Doctor/AddDoctor';
import DoctorCategory from './../Pages/Vendor/Doctor/DoctorCategory';
import DoctorFields from './../Pages/Vendor/Doctor/DoctorFields';
import Doctors from './../Pages/Vendor/Doctor/Doctors';
import EditDoctor from './../Pages/Vendor/Doctor/EditDoctor';
import AddAreas from './../Pages/Vendor/Location/Areas/AddAreas';
import Areas from './../Pages/Vendor/Location/Areas/Areas';
import EditArea from './../Pages/Vendor/Location/Areas/EditArea';
import AddCities from './../Pages/Vendor/Location/Cities/AddCities';
import Cities from './../Pages/Vendor/Location/Cities/Cities';
import EditCities from './../Pages/Vendor/Location/Cities/EditCities';
import AddCountry from './../Pages/Vendor/Location/Country/AddCountry';
import Country from './../Pages/Vendor/Location/Country/Country';
import EditCountry from './../Pages/Vendor/Location/Country/EditCountry';
import AddMedicalFields from './../Pages/Vendor/MedicalFields/AddMedicalFields';
import EditMedicalFields from './../Pages/Vendor/MedicalFields/EditMedicalFields';
import MedicalFields from './../Pages/Vendor/MedicalFields/MedicalFields';
import Profile from './../Pages/Vendor/Profile/Profile';
import Edit from './../Pages/Vendor/Users/Edit/Edit';
import Users from './../Pages/Vendor/Users/Users';
import UsersTable from './../Pages/Vendor/Users/UsersTable';
import Login from './../Pages/auth/Login/Login';

import DataNotFound from './../Components/Shared/DataNotFound/DataNotFound';
import HandelDelete from './../Components/Shared/HandelDelete/HandelDelete';
import Error from './../Components/Shared/NotFound/Error';
import AddBagging from './../Pages/Animals/Bagging/AddBagging';
import Bagging from './../Pages/Animals/Bagging/Bagging';
import EditBagging from './../Pages/Animals/Bagging/EditBagging';
import AddBaggingPricing from './../Pages/Animals/BaggingPricing/AddBaggingPricing';
import BaggingPricing from './../Pages/Animals/BaggingPricing/BaggingPricing';
import AddAnimalCat from './../Pages/Animals/Categories/AddAnimalCat';
import AnimalCat from './../Pages/Animals/Categories/AnimalCat';
import EditAnimalCat from './../Pages/Animals/Categories/EditAnimalCat';
import AddAnimalsCutting from './../Pages/Animals/Cutting/AddAnimalsCutting';
import AnimalsCutting from './../Pages/Animals/Cutting/AnimalsCutting';
import EditAnimalsCutting from './../Pages/Animals/Cutting/EditAnimalsCutting';
import AddCuttingPricing from './../Pages/Animals/CuttingPricing/AddCuttingPricing';
import CuttingPricing from './../Pages/Animals/CuttingPricing/CuttingPricing';
import AddAnimalsSubCategories from './../Pages/Animals/SubCategories/AddAnimalsSubCategories';
import AnimalsSubCategories from './../Pages/Animals/SubCategories/AnimalsSubCategories';
import EditAnimalsSubCategories from './../Pages/Animals/SubCategories/EditAnimalsSubCategories';
import Bidding from './../Pages/Bidding/Bidding';
import BiddingDetails from './../Pages/Bidding/BiddingDetails';
import BiddingRequests from './../Pages/Bidding/BiddingRequests';
import AddConsultTime from './../Pages/ConsultTime/AddConsultTime';
import ConsultTime from './../Pages/ConsultTime/ConsultTime';
import SingleConsultTime from './../Pages/ConsultTime/SingleConsultTime';
import StoreChatDetails from './../Pages/Store/StoreChatDetails';
import StoreDetails from './../Pages/Store/StoreDetails';
import StoreList from './../Pages/Store/StoreList';
import VisitDetails from './../Pages/Visits/VisitDetails';
import Visits from './../Pages/Visits/Visits';
import LoginMedicalCenter from './../Pages/auth/MedicalCenter/Login/LoginMedicalCenter';
import AddMCHour from './../Pages/auth/MedicalCenter/MCHours/AddMCHour';
import MCHours from './../Pages/auth/MedicalCenter/MCHours/MCHours';
import MCProfile from './../Pages/auth/MedicalCenter/MCProfile/MCProfile';
import Register from './../Pages/auth/MedicalCenter/Register/Register';

import AddHours from '../Pages/MedicalCenter/Centers/AddHours';
import CenterSingleHour from '../Pages/MedicalCenter/Centers/CenterSingleHour';
import Contact from '../Pages/Settings/Contact/Contact';
import NotFound from './../Components/Shared/Chat/NotFound';
import Seach from './../Components/Shared/Chat/Seach';
import InvalidRole from './../Components/Shared/InvalidRole/InvalidRole';
import CenterAdd from './../Pages/MedicalCenter/Centers/CenterAdd';
import CenterEdit from './../Pages/MedicalCenter/Centers/CenterEdit';
import CenterHours from './../Pages/MedicalCenter/Centers/CenterHours';
import Centers from './../Pages/MedicalCenter/Centers/Centers';
import ProfileCenter from './../Pages/MedicalCenter/Centers/ProfileCenter';
import AddDocs from './../Pages/MedicalCenter/Docs/AddDocs';
import Docs from './../Pages/MedicalCenter/Docs/Docs';
import DoctorFreeList from './../Pages/MedicalCenter/DoctorFree/DoctorFreeList';
import DoctorRequest from './../Pages/MedicalCenter/Request/DoctorRequest';

import DoctorService from '../Pages/Vendor/Doctor/Service/DoctorService';
import AddService from './../Pages/Services/AddService';
import EditService from './../Pages/Services/EditService';
import Services from './../Pages/Services/Services';
import AddDoctorService from './../Pages/Vendor/Doctor/Service/AddDoctorService';
import DoctorDocuments from './../Pages/Vendor/Doctor/DoctorDocuments';
import EditDoctorDocuments from './../Pages/Vendor/Doctor/EditDoctorDocuments';
import ChartLine from './../Pages/Vendor/Dashboard/ChartLine';
import ChartColumn from './../Pages/Vendor/Dashboard/ChartColumn';
import Summary from './../Pages/Vendor/Dashboard/Summary';
import AddDoctorDocuments from './../Pages/Vendor/Doctor/AddDoctorDocuments';
import ChartCircle from './../Pages/Vendor/Dashboard/ChartCircle';
import ChatOneLine from './../Pages/Vendor/Dashboard/ChatOneLine';
import ChartColumn2 from './../Pages/Vendor/Dashboard/ChartColumn2';

 

 
const Component= {
    // Layout 
    Vendor,
    Auth,
    Chat,
    Loader,
    Contact, 
    // Vendor Components User 1
    Dashboard,  
    ChartLine,
    ChartColumn,
    ChatOneLine,
    ChartCircle,    
    Summary,
    ChartColumn2,
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
    MCProfile,
    MCHours,
    AddMCHour,
    // chat component
    ChatClient,
    ClientList,
    LiveChat,
    Seach,
    NotFound,
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
    DoctorDocuments,
    EditDoctorDocuments,
    AddDoctorDocuments,
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
    // medical center
    Centers,
    DoctorRequest,
    DoctorFreeList,
    Docs,
    AddDocs,
    ProfileCenter,
    CenterEdit,
    CenterAdd,
    CenterHours,
    CenterSingleHour,
    AddHours,
    // Consult Time
    ConsultTime,
    SingleConsultTime,
    AddConsultTime,
    // Consult Time
    Services,
    AddService,
    EditService,
    
    // DoctorService
    DoctorService,
    AddDoctorService
}

export default Component


