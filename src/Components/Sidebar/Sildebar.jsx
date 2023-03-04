import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './Sidebar.scss'
import routes from './route.js';
import { useContext, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { VendersContext } from "../../context/Store";
import SidebarMenu from './SidebarMenu';
import Img from "../../assets/Img";

const Sidebar = ({ children }) => {
  let { isOpen, toggle, LogOut, setIsOpen } = useContext(VendersContext);


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
      <div className="main-container ">
        <motion.div
          animate={{
            width: isOpen ? "270px" : "50px",
            background: '#000',
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar  `}
        >
          <div className="side   ">

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
                    <img src={Img.logo} className="w-100"/>
                    {/* <h3>Baytrh</h3> */}
                  </motion.div>
                )}
                <div className="bars">
                  <FaBars onClick={toggle} size={20} />
                </div>
              </AnimatePresence>
            </div>
            <section className='routes '  >
              {
                routes.map((root, i) => {
                  if (root.subRoutes) {
                    return (
                      <SidebarMenu
                        key={i}
                        setIsOpen={setIsOpen}
                        route={root}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        open={isOpen}
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
                        <div className="icon" id={root.name} data-tooltip-content={root.name}>
                          {root.icon}
                        </div>
                        {/* {
                          !isOpen && <ReactTooltip anchorId={root.name} data-tip={root.name} place="right" style={{ zIndex: 88888888, background: '#313bac' }} />
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
                                {root.name}
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