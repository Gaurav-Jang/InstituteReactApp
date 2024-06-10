import PropType from "prop-types"; // prop-type
import { FaBell, FaShareAlt } from "react-icons/fa"; // react-icons
// import ChangeTheme from "../Theme/ChangeTheme"; // theme change
// import Logo from "../../assets/CompanyLogo/logo.png"; // logo
import { GiHamburgerMenu } from "react-icons/gi"; //hamburger
import "./NavBar.css"

const NavBar = ({sidebarToggle, setSidebarToggle }) => {
  return (
    <>
      <nav className={sidebarToggle ? "topnav" : "topnav-expand"} >
        <div className='topNav-left '> 
            <div className='hamburger' >
                <GiHamburgerMenu onClick={() => setSidebarToggle(!sidebarToggle)} />
            </div>
           
        </div>
         {/* buttons */}
          <div className='topnav-right'>
            {/* notification */}
            <div>
              <FaBell />
            </div>

            {/* share */}
            <div>
              <FaShareAlt />
            </div>
        </div>
    </nav>
    </>
  );
};


export default NavBar;
