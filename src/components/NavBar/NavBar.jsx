import { FaBell, FaShareAlt } from "react-icons/fa"; // react-icons
import { GiHamburgerMenu } from "react-icons/gi"; //hamburger
import "../css/NavBar.css";

const NavBar = ({ sidebarToggle, setSidebarToggle, pagename }) => {
  return (
    <>
      <nav className={sidebarToggle ? "topnav" : "topnav-expand"}>
        {/* menu button */}
        <div className="topNav-left ">
          <div className="hamburger">
            <GiHamburgerMenu
              className="menu"
              onClick={() => setSidebarToggle(!sidebarToggle)}
            />
          </div>
        </div>

        {/* nav text */}
        <div className="topNav-center">
          <h1>{pagename}</h1>
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
