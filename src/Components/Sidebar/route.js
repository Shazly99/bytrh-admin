import Icons from "../../constants/Icons";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <Icons.Dashboard size={19} />,
  },
  {
    path: "/client",
    name: "Clients",
    icon: <Icons.Clients size={19} />,
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: <Icons.doctor size={19} />,
  },
  {
    path: "/user",
    name: "Users",
    icon: <Icons.user size={19} />,
  },
  // {
  //   path: "/medicalfields",
  //   name: "Medical Fields",
  //   icon: <Icons.medical size={19} />
  // }, 
  {
    name: "Animals ",
    icon: <Icons.category size={19} />,
    subRoutes: [
      {
        path: "/animals/categories",
        name: "Categories ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/subcategories",
        name: "Sub Categories ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/animals/cutting",
        name: "Cutting ",
        icon: <Icons.dote size={19} />,
      },     
      // {
      //   path: "/animals/cuttingprice",
      //   name: "Cutting Price",
      //   icon: <Icons.dote size={19} />,
      // },
      {
        path: "/animals/bagging",
        name: "Bagging ",
        icon: <Icons.dote size={19} />,
      },
      // {
      //   path: "/animals/baggingprice",
      //   name: "Bagging Price",
      //   icon: <Icons.dote size={19} />,
      // },
 


    ],
  },

  {
    name: "Locations ",
    icon: <Icons.location size={19} />,
    subRoutes: [
      {
        path: "/location/country",
        name: "Country ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/cities",
        name: "Areas ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/areas",
        name: "Cities ",
        icon: <Icons.dote size={19} />,
      },

    ],
  },
  {
    path: "/consult",
    name: "Consults",
    icon: <Icons.consult size={19} />,
  }, 
  {
    path: "/ads",
    name: "Ads",
    icon: <Icons.ads size={19} />
  },
  {
    name: "Blogs ",
    icon: <Icons.blog size={19} />,
    subRoutes: [
      {
        path: "/blogs/client",
        name: " Client ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/blogs/doctor",
        name: " Doctor ",
        icon: <Icons.dote size={19} />,
      }, 

    ],
  },
  {
    path: "/adoption",
    name: "Adoption",
    icon: <Icons.pets size={19}/>,
  },
  {
    path: "/settings/general",
    name: "Settings",
    icon: <Icons.settings size={19} />
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <Icons.contact size={19} />
  },
];

export default routes