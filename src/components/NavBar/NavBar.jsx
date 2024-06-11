import { FaBell, FaShareAlt } from "react-icons/fa"; // react-icons
import { GiHamburgerMenu } from "react-icons/gi"; //hamburger
import "../CSS/NavBar.css";

const NavBar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <>
      <nav className={sidebarToggle ? "topnav" : "topnav-expand"}>
        <div className="topNav-left ">
          <div className="hamburger">
            <GiHamburgerMenu
              className="menu"
              onClick={() => setSidebarToggle(!sidebarToggle)}
            />
          </div>
        </div>
        {/* buttons */}
        <div className="topnav-right">
          {/* notification */}
          <div>
            <FaBell className="bell" />
          </div>

          {/* share */}
          <div>
            <FaShareAlt className="share" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
