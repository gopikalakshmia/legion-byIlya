'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { motion } from "framer-motion"
import { X, Menu } from 'lucide-react';
import FullLogo from "../../assets/logo-full.svg"
import SelectedLogo from  "../../assets/logo-full-selected.svg"
import styles from "../navigation.module.css"

const useBreakpoint = (breakpoint) => {
    const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false);
    
    useEffect(() => {
      const checkWidth = () => {
        setIsAboveBreakpoint(window.innerWidth >= breakpoint);
      };
      
      window.addEventListener('resize', checkWidth);
      checkWidth();
      return () => window.removeEventListener('resize', checkWidth);
    }, [breakpoint]);
    
    return isAboveBreakpoint;
  };

export default function NavBar ({navItems}) {

    const isDesktop = useBreakpoint(1200);
    const [open, setOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const pathname = usePathname()



    return (
        <nav className={styles.navigation}> 

            <div className={styles.navbar} style={{zIndex: 100}}>

            {/* MAIN LOGO */}
                <Link href='/'>
                    <div 
                        className={styles.logocontainer}
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setTimeout(() => setIsLogoHovered(false), 200)}
                    >  
                        <motion.div
                            initial={false}
                            animate={ isLogoHovered || pathname=== "/"? { scaleX: 2, x: 0, opacity: 1} : {x: -370, opacity: 1}}
                            exit={{x: -243, opacity: 0}}
                            transition={{ duration: 0.3}}
                            >
                            <Image
                                priority
                                src={SelectedLogo}
                                height={45}
                                width={0}
                                alt='American Legion War Memorial Commission'
                                onClick={() => setOpen(false)}
                            />
                        </motion.div>
               
                        <Image
                            priority
                            src={FullLogo}
                            height={45}
                            width={0}
                            alt='American Legion War Memorial Commission'
                            onClick={() => setOpen(false)}
                        />
                    </div>
                    
                </Link>

            {/* DESKTOP NAVIGATION OR HAMBURGER MENU */}
                {isDesktop? 
                    <ul>
                        {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                            href={item.path}
                            className={pathname === item.path ? styles.selected : ''}
                            >
                            {item.text}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    :
                    <div onClick={()=>setOpen(!open)} style={{cursor: 'pointer'}}>
                            {open ? <X size={32} /> : <Menu size={32} />}
                    </div>
                }

            </div>

            {/* MOBILE NAVIGATION */}
            <motion.nav 
                initial={{x: '100%'}}
                animate={{x: open ? 0 : '100%'}}
                transition={{duration: 0.3, ease: "easeOut"}}
                className={styles.navmobile}
                style={{zIndex: 11}}
            >
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.path} onClick={()=>setOpen(false)}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.nav>
            
        </nav>
    )
}