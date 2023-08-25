function NavTabs() {
    const currentPage = useLocation().pathname;
  
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
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
            to=".creators"
          >
            Creators
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to=".about"
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Groups"
            // Checks if the groups page is the current page
            className={currentPage === '/About' ? 'nav-link active' : 'nav-link'}
          >
            Groups
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Profile"
            // Check to see if the user profile is the current page
            className={currentPage === '/Profile' ? 'nav-link active' : 'nav-link'}
          >
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Contact"
            // Checks to see if the contact page is the current page
            className={currentPage === '/Contact' ? 'nav-link active' : 'nav-link'}
          >
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Login"
            // Checks to see if the contact page is the current page
            className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SignUp"
            // Checks to see if the contact page is the current page
            className={currentPage === '/SignUp' ? 'nav-link active' : 'nav-link'}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }
  
  export default NavTabs;
  