import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import Img from "../../assets/Img";
import { VendersContext } from "../../context/Store";
import './Sidebar.scss';
import SidebarMenu from './SidebarMenu';
import routes from './route.js';

const SidebarSM = ({ children }) => {
  let { isLang, isOpen,   setIsOpen } = useContext(VendersContext);


  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.4, when: "afterChildren" },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsOpen(false); 
      }else{
        setIsOpen(true);
      }
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <>
      <div className=" main-container_nav  " dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
        <motion.div
          dir={isLang === 'ar' ? 'rtl' : 'ltr'}
          animate={{
            width: isOpen ? "270px" : "0px",
            background: '#000',
            transition: {
              duration: 0.7,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar  `}
        >
          <div className="side   " style={{ [isLang === 'ar' ? 'right' : 'left']: 0 }}>
            <div className="top_section  ">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo mt-3"
                    key={1}
                  >
                    <Link to={'/dashboard'}  onClick={()=>setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                      <img loading="lazy" src={Img.logo} alt='logo' width={129} height={78} />
                    </Link>
                  </motion.div>
                )}
         
              </AnimatePresence>
            </div>
            <section className={isLang === 'ar' ? 'routes routesAr' : 'routes'}   >
              {
                routes?.filter((role) => role.Roles.includes(parseInt(localStorage.getItem("Role")))).map((root, i) => {
                  if (root.subRoutes) {
                    return (
                      <SidebarMenu
                        key={i}
                        setIsOpen={setIsOpen}
                        route={root}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        open={isOpen}
                        isLang={isLang}
                        onClick={()=>setIsOpen(!isOpen)}
                      />
                    );
                  }

                  return (
                    <motion.div
                      key={i}
                      animate={{
                        transition: {
                          duration: 2,
                          damping: 10
                        }
                      }}
                    >
                      <NavLink to={root.path} onClick={()=>setIsOpen(!isOpen)} key={i} className="link " >
                        <div className="icon" id={root.name} data-tooltip-content={isLang === 'ar' ? root.nameAr : root.nameEn}>
                          {root.icon}
                        </div>
                        {/* {
                          !isOpen && <ReactTooltip anchorId={root.name} data-tip={root.name} place="right" style={{ zIndex: 88888888, background: '#FAAA40' }} />
                        } */}

                        <AnimatePresence>
                          {
                            isOpen &&
                            <>
                              <motion.div
                                variants={showAnimation
                                }
                                initial={"hidden"}
                                animate={"show"}
                                exit={"hidden"}
                                className="link_text"
                              >
                                {isLang === 'ar' ? root.nameAr : root.nameEn}
                              </motion.div>
                            </>
                          }
                        </AnimatePresence>
                      </NavLink>
                    </motion.div>
                  )
                })
              }
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SidebarSM;