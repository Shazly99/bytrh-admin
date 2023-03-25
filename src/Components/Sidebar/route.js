import Icons from "../../constants/Icons";

const routes = [
  {
    path: "/",
    nameEn: "Dashboard",
    nameAr: "لوحة القيادة",
    icon: <Icons.Dashboard size={19} />,
    Roles: ["Admin"]
  },
  {
    path: "/client",
    nameEn: "Clients",
    nameAr: "عملاء ",

    icon: <Icons.Clients size={19} />,
    Roles: ["Admin"]

  },
  {
    path: "/doctors",
    nameAr: "الأطباء",
    nameEn: "Doctors",
    icon: <Icons.doctor size={19} />,
    Roles: ["Admin"]

  },
  {
    path: "/user",
    nameAr: "المستخدمين",
    nameEn: "Users",
    icon: <Icons.user size={19} />,
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
    icon: <Icons.category size={19} />,
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
    icon: <Icons.location size={19} />,
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
    icon: <Icons.consult size={19} />,
    Roles: ["Admin"],

  },
  {
    path: "/ads",
    nameAr: "إعلانـات",
    nameEn: "Ads",
    icon: <Icons.ads size={19} />,
    Roles: ["Admin"],

  },
  {
    nameAr: "المدونات ",
    nameEn: "Blogs ",
    icon: <Icons.blog size={19} />,
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
    nameAr: "محل",
    nameEn: "Store",
    icon: <Icons.shop size={19} />,
    Roles: ["Admin"],

  },
  {
    path: "/bidding",
    nameAr: "مـزادات",
    nameEn: "Bidding",
    icon: <Icons.bidding size={19} />,
    Roles: ["Admin"],

  },
  {
    path: "/adoption",
    nameAr: "تبــني",
    nameEn: "Adoption",
    icon: <Icons.pets size={19} />,
    Roles: ["Admin"],

  },
  {
    path: "/settings/general",
    nameAr: "إعدادات",
    nameEn: "Settings",
    icon: <Icons.settings size={19} />,
    Roles: ["Admin","doctor"],
  },
  {
    path: "/contact",
    nameAr: "اتصال",
    nameEn: "Contact",
    icon: <Icons.contact size={19} />,
    Roles: ["Admin","doctor"],
  },
];

export default routes