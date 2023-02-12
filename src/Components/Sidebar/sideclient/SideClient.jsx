import React from 'react'
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import '../Sidebar.scss'
import img from '../../../assets/Img'
import routes from './route.js';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { icons } from 'react-icons';
import Icons from "../../../constants/Icons";
import SidebarMenu from './SidebarMenu';


const SideClient = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);


 
      const showAnimation = {
        hidden: {
          width: 0,
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        },
        show: {
          opacity: 1,
          width: "auto",
          transition: {
            duration: 0.5,
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
          <div className="side ">

            <div className="top_section  ">
              <AnimatePresence>
                {isOpen&& (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                    key={img.logo}
                  >
                    <img  src={img.logo} className="w-100" />
                  </motion.h1>
                )}
                <div className="bars">
                  <FaBars onClick={toggle} size={20} />
                </div>
              </AnimatePresence>
            </div>
 
 
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  end
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          </div>

        </motion.div>
 
      </div>
        </>
    )
}

export default SideClient