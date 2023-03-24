import { AnimatePresence, motion } from "framer-motion";
import { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink, Route } from "react-router-dom";
import Img from "../../assets/Img";
import { VendersContext } from "../../context/Store";
import routes from './route.js';
import './Sidebar.scss';
import SidebarMenu from './SidebarMenu';

const Sidebar = ({ children }) => {
  let { isLang, isOpen, toggle, LogOut, setIsOpen } = useContext(VendersContext);


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

  return (
    <>
      <div className="main-container " dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
        <motion.div
          dir={isLang === 'ar' ? 'rtl' : 'ltr'}
          animate={{
            width: isOpen ? "270px" : "50px",
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
                    className="logo"
                    key={1}
                  >
                    <img loading="lazy" src={Img.logo} alt='logo' className="w-100" />
                  </motion.div>
                )}
                <div className="bars">
                  <FaBars onClick={toggle} size={20} />
                </div>
              </AnimatePresence>
            </div>
            <section className={isLang === 'ar' ? 'routes routesAr' : 'routes'}   >
              {
                routes?.filter((role) => role.Roles.includes("Admin")).map((root, i) => {
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
                      <NavLink to={root.path} key={i} className="link " >
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

export default Sidebar;