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
  {
    path: "/medicalfields",
    name: "Medical Fields",
    icon: <Icons.medical size={19} />
  },


  {
    name: "Categories ",
    icon: <Icons.category size={19} />,
    subRoutes: [
      {
        path: "/categ/animals",
        name: "Animals ",
        icon: <Icons.dote size={19} />,
      },

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
        name: "Cities ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/location/areas",
        name: "Areas ",
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
    path: "/settings/general",
    name: "Settings",
    icon: <Icons.settings size={19} />
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
        name: "Blog Client ",
        icon: <Icons.dote size={19} />,
      },
      {
        path: "/blogs/doctor",
        name: "Blog Doctor ",
        icon: <Icons.dote size={19} />,
      }, 

    ],
  },
  {
    path: "/adoption",
    name: "Adoption",
    icon: <Icons.pets size={19}/>,
  },
 
];

export default routes