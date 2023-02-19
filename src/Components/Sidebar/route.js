import Icons from "../../constants/Icons";

const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <Icons.Dashboard size={20}/>,
    },
    {
      path: "/client",
      name: "Clients",
      icon: <Icons.Clients size={20}/>,
    },
    {
      path: "/doctors",
      name: "Doctors",
      icon: <Icons.doctor size={20}/>,
    }, 
    {
      path: "/user",
      name: "Admin",
      icon: <Icons.user size={20}/>,
    },
 
  ];

  export default routes