import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavTabs() {
    const currentPage = useLocation().pathname;
    const [isNavCollapsed,  setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  
    return (
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-o border-b border-gray-200 Dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className='flex items-center'>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Study Group Maker</span>
          </a>
          <div className="flex md:order-2">
            <button onClick={handleNavCollapse} data-collapse-toggle='navbar-sticky' type='button' className='inline-flex items-center p-2 w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='navbar-sticky' aria-expanded={!isNavCollapsed ? true : false}>
                <span className='sr-only'>Open main menu</span>
                <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
                  <path stroke="currentColor" stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M1 1h15M1 7h15M1 13h15'/>
                </svg>
            </button>
          </div>
          <div className={`${
            isNavCollapsed ? "hidden" : "flex"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`} id-="navbar-sticky">
            <ul className="nav nav-tabs flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="nav-item block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current='page'>
                <Link
                  to="/"
                  //set the Home page to the active page
                  className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">

                <Link
                  to="/#creators"
                  //set the Home page to the active page
                  className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                Creators
                </Link>
                
              </li>
              <li className="nav-item">     
                <Link
                  to="/#about"
                  //set the Home page to the active page
                  className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                About Us
                </Link>
              </li>
              <li className="nav-item block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link
                  to="/Groups"
                  // Checks if the groups page is the current page
                  className={currentPage === '/Groups' ? 'nav-link active' : 'nav-link'}
                >
                  Groups
                </Link>
              </li>
              <li className="nav-item block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link
                  to="/Profile/:_id"
                  // Check to see if the user profile is the current page
                  className={currentPage === '/Profile' ? 'nav-link active' : 'nav-link'}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link
                  to="/Contact"
                  // Checks to see if the contact page is the current page
                  className={currentPage === '/Contact' ? 'nav-link active' : 'nav-link'}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link
                  to="/Login"
                  // Checks to see if the contact page is the current page
                  className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <Link
                  to="/SignUp"
                  // Checks to see if the contact page is the current page
                  className={currentPage === '/SignUp' ? 'nav-link active' : 'nav-link'}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default NavTabs;
  