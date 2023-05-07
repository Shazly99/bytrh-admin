import Icons from "../../constants/Icons";
import LogoSvg from "../../assets/svg/LogoSvg";

const routes = [
  // {
  //   path: "/dashboard",
  //   nameEn: "Dashboard",
  //   nameAr: "لوحة القيادة",
  //   icon: <LogoSvg.Dashboard className="logoSvg" style={{ width: 19 }} />,
  //   Roles: [1, 2]
  // }, 
   {
    path: "/dashboard/user",
    nameAr: "المستخدمين",
    nameEn: "Users",
    icon: <LogoSvg.Users className="logoSvg" style={{ width: 19 }} />,
    Roles: [1, 2]

  },
  {
    path: "/dashboard/client",
    nameEn: "Clients",
    nameAr: "عملاء ",
    icon: <LogoSvg.Clients className="logoSvg" style={{ width: 19 }} />,
    Roles: [1]
  },
  {
    nameAr: "الأطباء",
    nameEn: "Doctors",
    icon: <LogoSvg.Doctors className="logoSvg" style={{ width: 19 }} />,
    Roles: [1, 2],
    subRoutes: [
      {
        path: "/dashboard/doctors",
        nameAr: "قائمة الأطباء ",
        nameEn: "List",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/doctorfree",
        nameAr: "الطبيب الحر",
        nameEn: "Free",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/doctor/request",
        nameAr: "طلبات",
        nameEn: "Request",
        icon: <Icons.Dote size={19} />,
      },

    ],
  }, 

  {
    path: "/dashboard/medicalcenter",
    nameAr: "مركــز طبـــي",
    nameEn: "Medical Center",
    icon: <LogoSvg.Visits className="logoSvg" style={{ width: 19 }} />,
    Roles: [1]

  },
  {
    path: "/dashboard/hours",
    nameAr: "مواعيد المركز الطبي",
    nameEn: "Center Hours",
    // icon: <LogoSvg.Visits className="logoSvg" style={{ width: 19 }} />,
    icon: <Icons.Time size={19} />,
    Roles: [2]

  },
  {
    nameAr: "الحيوانات ",
    nameEn: "Animals ",
    icon: <LogoSvg.Animals className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],
    subRoutes: [
      {
        path: "/dashboard/animals/categories",
        nameAr: "فئات ",
        nameEn: "Categories ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/animals/subcategories",
        nameAr: "الفئات الفرعية ",
        nameEn: "Sub Categories ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/animals/cutting",
        nameAr: "قطع   ",
        nameEn: "Cutting ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/animals/cuttingprice",
        nameAr: "سعر القطع",
        nameEn: "Cutting Price",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/animals/bagging",
        nameAr: "تكييس ",
        nameEn: "Bagging ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/animals/baggingprice",
        nameAr: "سعر التكييس",
        nameEn: "Bagging Price",
        icon: <Icons.Dote size={19} />,
      },
    ],
  },

  {
    nameAr: "المــواقع ",
    nameEn: "Locations ",
    icon: <LogoSvg.Location className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],
    subRoutes: [
      {
        path: "/dashboard/location/country",
        nameAr: "بلدان ",
        nameEn: "Country ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/location/cities",
        nameAr: "المناطق ",
        nameEn: "Areas ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/location/areas",
        nameAr: "مدن ",
        nameEn: "Cities ",
        icon: <Icons.Dote size={19} />,
      },

    ],
  },
  {
    nameAr: "حالة طبية ",
    nameEn: "Medical ",
    icon: <LogoSvg.Visits className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],

    subRoutes: [
  
      {
        path: "/dashboard/consult",
        nameAr: "استشـارات",
        nameEn: "Consults",
        icon: <Icons.Dote size={19} />,
        Roles: [1, 2],
      },
      {
        path: "/dashboard/visits",
        nameAr: "الــزيارات",
        nameEn: "Visits",
        icon: <Icons.Dote size={19} />,
        Roles: [1, 2],
      },
      {
        path: "/dashboard/services",
        nameAr: "الخدمــات",
        nameEn: "Services",
        icon: <Icons.Dote size={19} />,
        Roles: [1, 2],
      },

    ],
  },
  {
    nameAr: "عمليات البيع ",
    nameEn: "Sellings ",
    icon: <LogoSvg.Store className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/dashboard/store",
        nameAr: "متجر",
        nameEn: "Store",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/bidding",
        nameAr: "مـزادات",
        nameEn: "Bidding",
        icon: <Icons.Dote size={19} />,
      },

    ],
  },
  {
    path: "/dashboard/ads",
    nameAr: "إعلانـات",
    nameEn: "Ads",
    icon: <LogoSvg.Ads className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],

  },
  {
    nameAr: "المدونات ",
    nameEn: "Blogs ",
    icon: <LogoSvg.Blogs className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/dashboard/blogs/client",
        nameAr: " عميل ",
        nameEn: " Client ",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/blogs/doctor",
        nameAr: " طبيب ",
        nameEn: " Doctor ",
        icon: <Icons.Dote size={19} />,
      },

    ],
  },
  {
    path: "/dashboard/blogs/doctor",
    nameAr: "المدونات ",
    nameEn: "Doctor Blogs ",
    icon: <LogoSvg.Blogs className="logoSvg" style={{ width: 19 }} />,
    Roles: [2],

  },
  {
    path: "/dashboard/adoption",
    nameAr: "تبــني",
    nameEn: "Adoption",
    icon: <LogoSvg.Adoption className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],

  },
  {
    nameAr: "الاعدادات العامة ",
    nameEn: "General settings ",
    icon: <LogoSvg.Settings className="logoSvg" style={{ width: 19 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/dashboard/settings/general",
        nameAr: "إعدادات",
        nameEn: "Settings",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/consultTime",
        nameAr: "أوقات الإستشـارة",
        nameEn: "Consult Times",
        icon: <Icons.Dote size={19} />,
      },
      {
        path: "/dashboard/contact",
        nameAr: "اتصال",
        nameEn: "Contact",
        icon: <Icons.Dote size={19} />,
      },

    ],
  },
  {
    path: "/dashboard/visits",
    nameAr: "الــزيارات",
    nameEn: "Visits",
    icon: <LogoSvg.Visits className="logoSvg" style={{ width: 19 }} />,
    Roles: [2]
  },
  {
    path: "/dashboard/consult",
    nameAr: "استشـارات",
    nameEn: "Consults",
    icon: <LogoSvg.Consults className="logoSvg" style={{ width: 19 }} />,
    Roles: [2],
  },
  {
    path: "/dashboard/services",
    nameAr: "الخدمــات",
    nameEn: "Services",
    icon: <LogoSvg.Adoption className="logoSvg" style={{ width: 19 }} />,
    Roles: [2],
  },
];

export default routes