import Icons from "../../constants/Icons";
import LogoSvg from "../../assets/svg/LogoSvg";

const routes = [
  {
    path: "",
    nameEn: "Dashboard",
    nameAr: "لوحة القيادة",
    icon: <LogoSvg.Dashboard className="logoSvg" style={{ width: 17 }} />,
    Roles: [1]
  },
  {
    path: "/request",
    nameAr: "الطلبــات",
    nameEn: "Requests",
    icon: <LogoSvg.Requests className="logoSvg" style={{ width: 17 }} />,
    Roles: [1, 2]

  },
  {
    path: "/user",
    nameAr: "المستخدمين",
    nameEn: "Users",
    icon: <LogoSvg.Users className="logoSvg" style={{ width: 17 }} />,
    Roles: [1, 2]

  },

  {
    path: "/client",
    nameEn: "Clients",
    nameAr: "عملاء ",
    icon: <LogoSvg.Clients className="logoSvg" style={{ width: 17 }} />,
    Roles: [1]
  },
  {
    path: "/doctors",
    nameAr: "الأطباء",
    nameEn: "Doctors",
    icon: <LogoSvg.Doctors className="logoSvg" style={{ width: 17 }} />,
    Roles: [1, 2],
    // subRoutes: [
    //   {
    //     path: "/doctors",
    //     nameAr: "قائمة الأطباء ",
    //     nameEn: "List",
    //     icon: <Icons.Dote size={17} />,
    //   },
    //   {
    //     path: "/doctorfree",
    //     nameAr: "الطبيب الحر",
    //     nameEn: "Free",
    //     icon: <Icons.Dote size={17} />,
    //   },
    //   {
    //     path: "/doctor/request",
    //     nameAr: "طلبات",
    //     nameEn: "Request",
    //     icon: <Icons.Dote size={17} />,
    //   },

    // ],
  },

  {
    path: "/medicalcenter",
    nameAr: "مركــز طبـــي",
    nameEn: "Medical Center",
    icon: <LogoSvg.Visits className="logoSvg" style={{ width: 17 }} />,
    Roles: [1]

  },
  {
    path: "/hours",
    nameAr: "مواعيد المركز الطبي",
    nameEn: "Center Hours",
    // icon: <LogoSvg.Visits className="logoSvg" style={{ width: 17 }} />,
    icon: <Icons.Time size={17} />,
    Roles: [2]

  },
  {
    nameAr: "الحيوانات ",
    nameEn: "Animals ",
    icon: <LogoSvg.Animals className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],
    subRoutes: [
      {
        path: "/animals/categories",
        nameAr: "فئات ",
        nameEn: "Categories ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/animals/subcategories",
        nameAr: "الفئات الفرعية ",
        nameEn: "Sub Categories ",
        icon: <Icons.Dote size={17} />,
      },

      {
        path: "/animals/adoptionsSubcategories",
        nameAr: "      الفئات الفرعية للتبني  ",
        nameEn: "Adoption Categories ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/animals/cutting",
        nameAr: "قطع   ",
        nameEn: "Cutting ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/animals/cuttingprice",
        nameAr: "سعر القطع",
        nameEn: "Cutting Price",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/animals/bagging",
        nameAr: "تكييس ",
        nameEn: "Bagging ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/animals/baggingprice",
        nameAr: "سعر التكييس",
        nameEn: "Bagging Price",
        icon: <Icons.Dote size={17} />,
      },
    ],
  },

  {
    nameAr: "المــواقع ",
    nameEn: "Locations ",
    icon: <LogoSvg.Location className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],
    subRoutes: [
      {
        path: "/location/country",
        nameAr: "بلدان ",
        nameEn: "Country ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/location/cities",
        nameAr: "المناطق ",
        nameEn: "Areas ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/location/areas",
        nameAr: "مدن ",
        nameEn: "Cities ",
        icon: <Icons.Dote size={17} />,
      },

    ],
  },
  {
    nameAr: "حالة طبية ",
    nameEn: "Medical ",
    icon: <LogoSvg.Visits className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

    subRoutes: [

      {
        path: "/consult",
        nameAr: "استشـارات",
        nameEn: "Consults",
        icon: <Icons.Dote size={17} />,
        Roles: [1, 2],
      },
      {
        path: "/visits",
        nameAr: "الــزيارات",
        nameEn: "Visits",
        icon: <Icons.Dote size={17} />,
        Roles: [1, 2],
      },
      {
        path: "/services",
        nameAr: "الخدمــات",
        nameEn: "Services",
        icon: <Icons.Dote size={17} />,
        Roles: [1, 2],
      },

    ],
  },
  {
    nameAr: "  بيع وشراء ",
    nameEn: "Sell And Buy ",
    icon: <LogoSvg.Store className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/store",
        nameAr: "متجر",
        nameEn: "Store",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/bidding",
        nameAr: "مـزادات",
        nameEn: "Bidding",
        icon: <Icons.Dote size={17} />,
      },

    ],
  },
  {
    path: "/ads",
    nameAr: "إعلانـات",
    nameEn: "Ads",
    icon: <LogoSvg.Ads className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

  },
  {
    nameAr: "المدونات ",
    nameEn: "Blogs ",
    icon: <LogoSvg.Blogs className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/blogs/client",
        nameAr: " عميل ",
        nameEn: " Client ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/blogs/doctor",
        nameAr: " طبيب ",
        nameEn: " Doctor ",
        icon: <Icons.Dote size={17} />,
      },

    ],
  },


  {
    nameAr: "اتصل بنا",
    nameEn: "Contact us",
    icon: <LogoSvg.Contact className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/contactUs/client",
        nameAr: " عميل ",
        nameEn: " Client ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/contactUs/doctor",
        nameAr: " طبيب ",
        nameEn: " Doctor ",
        icon: <Icons.Dote size={17} />,
      },

    ],
  },
  {
    path: "/blogs/doctor",
    nameAr: "المدونات ",
    nameEn: "Doctor Blogs ",
    icon: <LogoSvg.Blogs className="logoSvg" style={{ width: 17 }} />,
    Roles: [2],

  },
  {
    path: "/adoption",
    nameAr: "تبــني",
    nameEn: "Adoption",
    icon: <LogoSvg.Adoption className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

  },
  {
    nameAr: "تقـــارير",
    nameEn: "Reports",
    icon: <LogoSvg.Report className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],
    subRoutes: [
      {
        path: "/reports/doctors",
        nameAr: "معاملات الطبيب   ",
        nameEn: "Doctor Transactions  ",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/reports/clients",
        nameAr: "معاملات العملاء  ",
        nameEn: "  Client Transactions",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/visitsreports",
        nameAr: "تقارير الزيـارات",
        nameEn: "Visits Reports",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/consultsreports",
        nameAr: "تقارير الإستشـارات",
        nameEn: "Consults Reports",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/salesreports",
        nameAr: "تقارير المبيعـات",
        nameEn: "Sales Reports",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/biddingreports",
        nameAr: "تقارير المزادات",
        nameEn: "Bidding Reports",
        icon: <Icons.Dote size={17} />,
      },

    ],
  },
  {
    nameAr: "الاعدادات العامة ",
    nameEn: "General settings ",
    icon: <LogoSvg.Settings className="logoSvg" style={{ width: 17 }} />,
    Roles: [1],

    subRoutes: [
      {
        path: "/settings/general",
        nameAr: "إعدادات",
        nameEn: "Settings",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/consultTime",
        nameAr: "أوقات الإستشـارة",
        nameEn: "Consult Times",
        icon: <Icons.Dote size={17} />,
      },
      {
        path: "/contact",
        nameAr: "اتصال",
        nameEn: "Contact",
        icon: <Icons.Dote size={17} />,
      },

    ],
  },
  {
    path: "/visits",
    nameAr: "الــزيارات",
    nameEn: "Visits",
    icon: <LogoSvg.Visits className="logoSvg" style={{ width: 17 }} />,
    Roles: [2]
  },
  {
    path: "/consult",
    nameAr: "استشـارات",
    nameEn: "Consults",
    icon: <LogoSvg.Consults className="logoSvg" style={{ width: 17 }} />,
    Roles: [2],
  },
  {
    path: "/services",
    nameAr: "الخدمــات",
    nameEn: "Services",
    icon: <LogoSvg.Adoption className="logoSvg" style={{ width: 17 }} />,
    Roles: [2],
  },

];

export default routes