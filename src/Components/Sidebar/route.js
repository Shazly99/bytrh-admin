import Icons from "../../constants/Icons";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <Icons.Dashboard size={20} />,
  },
  {
    path: "/client",
    name: "Clients",
    icon: <Icons.Clients size={20} />,
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: <Icons.doctor size={20} />,
  },
  {
    path: "/user",
    name: "Users",
    icon: <Icons.user size={20} />,
  },
  {
    path: "/medicalfields",
    name: "Medical Fields",
    icon: <Icons.medical size={20} />
  },
  {
    path: "/settings/general",
    name: "Settings",
    icon: <Icons.settings size={20} />
  },

  {
    name: "Categories ",
    icon: <Icons.category size={20} />,
    subRoutes: [
      {
        path: "/categ/animals",
        name: "Animals ",
        icon: <Icons.dote size={20} />,
      },

    ],
  },

  {
    name: "Locations ",
    icon: <Icons.location size={20} />,
    subRoutes: [
      {
        path: "/location/country",
        name: "Country ",
        icon: <Icons.dote size={20} />,
      },
      {
        path: "/location/cities",
        name: "Cities ",
        icon: <Icons.dote size={20} />,
      },
      {
        path: "/location/areas",
        name: "Areas ",
        icon: <Icons.dote size={20} />,
      },

    ],
  },
  {
    path: "/chat/consult",
    name: "Consults",
    icon: <Icons.consult size={20} />,
  },


];

export default routes