"use client"
import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";

const navLinks=[
    {name:'home',href:'/'},
    {name:'about',href:'/about'},
    {name:'projects',href:'/projects'},
    {name:'blog',href:'/blog'}
]

const NavBar = () => {
    const pathname = usePathname() //Hook ini memberikan URL path saat ini (misalnya, /about).


    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <li key={link.name}>
                            <Link href={link.href} className={isActive ? 'text-blue-400' : 'text-white'}>
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavBar;