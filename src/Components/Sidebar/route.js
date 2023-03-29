import Icons from "../../constants/Icons"; 
import LogoSvg from "../../assets/svg/LogoSvg";
 
const routes = [
  {
    path: "/",
    nameEn: "Dashboard",
    nameAr: "لوحة القيادة",
    icon: <LogoSvg.Dashboard className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"]
  },
  {
    path: "/client",
    nameEn: "Clients",
    nameAr: "عملاء ",
    icon: <LogoSvg.Clients className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"]
  },
  {
    path: "/doctors",
    nameAr: "الأطباء",
    nameEn: "Doctors",
    icon:<LogoSvg.Doctors className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"]

  },
  {
    path: "/visits",
    nameAr: "الــزيارات",
    nameEn: "Visits",
    icon: <LogoSvg.Visits className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"]

  },
  {
    path: "/user",
    nameAr: "المستخدمين",
    nameEn: "Users",
    icon: <LogoSvg.Users className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"]

  },
  // {
  //   path: "/medicalfields",
  //   nameAr: "المجالات الطبية",
  //   nameEn: "Medical Fields",
  //   icon: <Icons.medical size={19} />
  // }, 
  {
    nameAr: "الحيوانات ",
    nameEn: "Animals ",
    icon: <LogoSvg.Animals className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],
    subRoutes: [
      {
        path: "/animals/categories",
        nameAr: "فئات ",
        nameEn: "Categories ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/subcategories",
        nameAr: "الفئات الفرعية ",
        nameEn: "Sub Categories ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/cutting",
        nameAr: "قطع   ",
        nameEn: "Cutting ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/cuttingprice",
        nameAr: "سعر القطع",
        nameEn: "Cutting Price",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/bagging",
        nameAr: "تكييس ",
        nameEn: "Bagging ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/baggingprice",
        nameAr: "سعر التكييس",
        nameEn: "Bagging Price",
        icon: <Icons.dote size={19} />,
      },



    ],
  },

  {
    nameAr: "المــواقع ",
    nameEn: "Locations ",
    icon: <LogoSvg.Location className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],
    subRoutes: [
      {
        path: "/location/country",
        nameAr: "بلدان ",
        nameEn: "Country ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/cities",
        nameAr: "المناطق ",
        nameEn: "Areas ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/areas",
        nameAr: "مدن ",
        nameEn: "Cities ",
        icon: <Icons.dote size={19} />,
      },

    ],
  },
  {
    path: "/consult",
    nameAr: "استشـارات",
    nameEn: "Consults",
    icon: <LogoSvg.Consults className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],

  },
  {
    path: "/ads",
    nameAr: "إعلانـات",
    nameEn: "Ads",
    icon: <LogoSvg.Ads className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],

  },
  {
    nameAr: "المدونات ",
    nameEn: "Blogs ",
    icon:<LogoSvg.Blogs className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],

    subRoutes: [
      {
        path: "/blogs/client",
        nameAr: " عميل ",
        nameEn: " Client ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/blogs/doctor",
        nameAr: " طبيب ",
        nameEn: " Doctor ",
        icon: <Icons.dote size={19} />,
      },

    ],
  },
  {
    path: "/store",
    nameAr: "متجر",
    nameEn: "Store",
    icon:<LogoSvg.Store className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],

  },
  {
    path: "/bidding",
    nameAr: "مـزادات",
    nameEn: "Bidding",
    icon:<LogoSvg.Bidding className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],

  },
  {
    path: "/adoption",
    nameAr: "تبــني",
    nameEn: "Adoption",
    icon: <LogoSvg.Adoption className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin"],

  },
  {
    path: "/settings/general",
    nameAr: "إعدادات",
    nameEn: "Settings",
    icon: <LogoSvg.Settings className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin", "doctor"],
  },
  {
    path: "/consultTime",
    nameAr: "أوقات الإستشـارة",
    nameEn: "Consult Times",
    icon: <Icons.time size={19} />,
    Roles: ["Admin", "doctor"],
  },
  {
    path: "/contact",
    nameAr: "اتصال",
    nameEn: "Contact",
    icon: <LogoSvg.Contact className="logoSvg" style={{width:19}}/>,
    Roles: ["Admin", "doctor"],
  },
];

export default routes