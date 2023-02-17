import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './Sidebar.scss'
import img from '../../assets/Img'
import routes from './route.js';
import { useContext, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { icons } from 'react-icons';
import Icons from "../../constants/Icons";
import { VendersContext } from "../../context/Store";

const Sidebar = ({ children }) => {
  let { isOpen, toggle, LogOut } = useContext(VendersContext);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
      // duration: 0.5, ease: 'backOut'
        
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
      // duration: 0.5, ease: 'backOut'
        
      },
    },
  };
  return (
    <>
      <div className="main-container ">
        <motion.div
          animate={{
            width: isOpen ? "270px" : "50px",
            transition: {
      /*         duration: 0.5,
              type: "spring",
              damping: 10, */
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
                    key={img.logo}
                  >
                    <img src={img.logo} className="w-100" />
                    <h3>Baytrh</h3>
                  </motion.div>
                )}
                <div className="bars">
                  <FaBars onClick={toggle} size={20} />
                </div>
              </AnimatePresence>
            </div>

            <section className='routes '  >
              {
                routes.map((root, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      transition: {
                        duration: 2,
                        damping: 10
                      }
                    }}
                  >
                    <NavLink to={root.path} key={i} className="link  " >
                      <div className="icon" id={root.name} data-tooltip-content={root.name}>
                        {root.icon}
                      </div>
                      {
                        !isOpen && <ReactTooltip anchorId={root.name} data-tip={root.name} place="right" style={{ zIndex: 88888888, background: '#313bac' }} />
                      }

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
                ))
              }

              {/* <motion.div
                animate={{
                  transition: {
                    duration: 2,
                    damping: 10
                  }
                }}
              >
                <NavLink onClick={LogOut} to={'/auth/login'} className="link" >
                <div className="icon" id={'LogOut'} data-tooltip-content={'LogOut'}>
                    <Icons.logout size={20} />
                  </div>
                  {
                    !isOpen && <ReactTooltip anchorId={'LogOut'} data-tip={'LogOut'} place="right" style={{ zIndex: 88888888, background: '#1B578D' }} />
                  }
                  <AnimatePresence>
                    {
                      isOpen &&
                      <>
                        <motion.div
                          variants={showAnimation}
                          initial={"hidden"}
                          animate={"show"}
                          exit={"hidden"}
                          className="link_text"
                        >
                          Log Out
                        </motion.div>
                      </>
                    }
                  </AnimatePresence>
                </NavLink>

              </motion.div> */}
            </section>
          </div>

        </motion.div>

      </div>
    </>
  );
};

export default Sidebar;