import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import './Sidebar.scss'
import img from '../../assets/Img'
import routes from './route.js';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { icons } from 'react-icons';
import Icons from "../../constants/Icons";




const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);


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
            width: isOpen ? "300px" : "50px",
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
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                    key={img.logo}
                  >
                    <img src={img.logo} className="w-100" />
                  </motion.h1>
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
                        !isOpen && <ReactTooltip anchorId={root.name} data-tip={root.name} place="right" style={{ zIndex: 88888888, background: '#BF1E30' }} />
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
            </section>
          </div>

        </motion.div>

      </div>
    </>
  );
};

export default Sidebar;