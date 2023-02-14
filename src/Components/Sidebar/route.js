import Icons from "../../constants/Icons";

const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <Icons.Dashboard size={20}/>,
    },
    {
      path: "/venderProducts",
      name: "Products",
      icon: <Icons.shop size={20}/>,
    },
    {
      path: "/venderOrder",
      name: "Orders",
      icon: <Icons.Products size={20}/>,
    },
    {
      path: "/venderSubuser",
      name: "Sub Users",
      icon: <Icons.user size={20}/>,
    },
    // {
    //   path: "/venderProfile",
    //   name: "Profile",
    //   icon: <Icons.profile size={20}/>,
    // },
 
  ];

  export default routes