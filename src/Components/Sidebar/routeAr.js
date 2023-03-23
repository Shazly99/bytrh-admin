import Icons from "../../constants/Icons";

const routeAr = [
  {
    path: "/",
    name: "لوحة القيادة",
    icon: <Icons.Dashboard size={19} />,
  },
  {
    path: "/client",
    name: "عملاء ",
    icon: <Icons.Clients size={19} />,
  },
  {
    path: "/doctors",
    name: "الأطباء",
    icon: <Icons.doctor size={19} />,
  },
  {
    path: "/user",
    name: "المستخدمين",
    icon: <Icons.user size={19} />,
  },
  // {
  //   path: "/medicalfields",
  //   name: "المجالات الطبية",
  //   icon: <Icons.medical size={19} />
  // }, 
  {
    name: "الحيوانات ",
    icon: <Icons.category size={19} />,
    subRoutes: [
      {
        path: "/animals/categories",
        name: "فئات ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/subcategories",
        name: "الفئات الفرعية ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/cutting",
        name: "قطع   ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/cuttingprice",
        name: "سعر القطع",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/bagging",
        name: "تكييس ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/baggingprice",
        name: "سعر التكييس",
        icon: <Icons.dote size={19} />,
      },



    ],
  },

  {
    name: "المواقع ",
    icon: <Icons.location size={19} />,
    subRoutes: [
      {
        path: "/location/country",
        name: "بلدان ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/cities",
        name: "المناطق ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/areas",
        name: "مدن ",
        icon: <Icons.dote size={19} />,
      },

    ],
  },
  {
    path: "/consult",
    name: "استشارة",
    icon: <Icons.consult size={19} />,
  },
  {
    path: "/ads",
    name: "إعلانات",
    icon: <Icons.ads size={19} />
  },
  {
    name: "المدونات ",
    icon: <Icons.blog size={19} />,
    subRoutes: [
      {
        path: "/blogs/client",
        name: " عميل ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/blogs/doctor",
        name: " طبيب ",
        icon: <Icons.dote size={19} />,
      },

    ],
  },
  {
    path: "/store",
    name: "محل",
    icon: <Icons.shop size={19} />,
  },
  {
    path: "/bidding",
    name: "مزايدة",
    icon: <Icons.bidding size={19} />,
  },
  {
    path: "/adoption",
    name: "تبني",
    icon: <Icons.pets size={19} />,
  },
  {
    path: "/settings/general",
    name: "إعدادات",
    icon: <Icons.settings size={19} />
  },
  {
    path: "/contact",
    name: "اتصال",
    icon: <Icons.contact size={19} />
  },
];

export default routeAr