import { useState } from "react"; // hook
import usePopup from "../CustomHooks/usePopup"; // custom hook
import { Link, NavLink } from "react-router-dom"; // navigation
import IWS from "/iws.webp"; // logo
// react icons
import * as md from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaUserCircle, FaRegCircle } from "react-icons/fa";
// import { CgNotes } from "react-icons/cg";
import "../css/SideBar.css"; // custom css file

const SideBar = ({ sidebarToggle }) => {
  // dropdown initially set to false(close)
  const [dropdownOpen, setDropdownOpen] = useState({
    classroom: false,
    student: false,
    payment: false,
    fee: false,
  });

  // dropdown open/close
  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => {
      // Close all other dropdowns
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === dropdown ? !prev[key] : false;
        return acc;
      }, {});
      return newState;
    });
  };

  // dropdown icon open/close
  const renderDropdownIcon = (isOpen) => {
    return isOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />;
  };

  // popups
  const { renderPopup, hidePopup } = usePopup();

  return (
    <nav className={sidebarToggle ? "sidenav" : "sidenav-collapse"}>
      {/* company detail */}
      <div className="px-3 brand-name d-flex align-items-center">
        {/* image */}
        <Link to="/">
          <img src={IWS} alt="IWS-logo" />
        </Link>

        {/* text */}
        <h1 className={sidebarToggle ? "menu-item" : "menu-item-collapse"}>
          <Link to="/">IWS</Link>
        </h1>
      </div>

      {/* admin */}
      <div className="user-login py-3 px-3">
        <FaUserCircle style={{ fontSize: "30px" }} />
        <span className={sidebarToggle ? "menu-item" : "menu-item-collapse"}>
          Admin&nbsp;User
        </span>
      </div>

      {/* navigation menus */}
      <div className="nav-menu">
        <ul className="px-2 my-3">
          {/* dashboard */}
          <li>
            <NavLink
              to="/"
              className="nav-item"
              activeclassname="active"
              onClick={hidePopup}
            >
              <md.MdDashboard style={{ fontSize: "28px" }} />
              <span
                className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
              >
                Dashboard
              </span>
            </NavLink>
          </li>

          {/* classroom */}
          <li
            onClick={() => toggleDropdown("classroom")}
            className="nav-dropdown"
          >
            <div className="nav-item" onClick={hidePopup}>
              <md.MdClass style={{ fontSize: "28px" }} />
              <span
                className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
              >
                ClassRoom
              </span>
            </div>
            {renderDropdownIcon(dropdownOpen.classroom)}
          </li>
          {/* dropdown */}
          {dropdownOpen.classroom && (
            <ul className="sub-menu">
              {/* add classroom */}
              <li>
                <NavLink
                  to="/AddClassRoom"
                  className="sub-item"
                  onClick={hidePopup}
                >
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Add Classroom
                  </span>
                </NavLink>
              </li>

              {/* edit classroom */}
              <li>
                <NavLink
                  to="/EditClassRoom"
                  className="sub-item"
                  onClick={hidePopup}
                >
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Edit Classroom
                  </span>
                </NavLink>
              </li>
            </ul>
          )}

          {/* student */}
          <li
            onClick={() => toggleDropdown("student")}
            className="nav-dropdown"
          >
            <div className="nav-item" onClick={hidePopup}>
              <PiStudentFill style={{ fontSize: "28px" }} />
              <span
                className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
              >
                Student
              </span>
            </div>
            {renderDropdownIcon(dropdownOpen.student)}
          </li>
          {/* dropdown */}
          {dropdownOpen.student && (
            <ul className="sub-menu">
              {/* add student */}
              <li>
                <NavLink
                  to="/AddStudent"
                  className="sub-item"
                  onClick={hidePopup}
                >
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Add Student
                  </span>
                </NavLink>
              </li>

              {/* edit student */}
              <li>
                <NavLink
                  to="/EditStudent"
                  className="sub-item"
                  onClick={hidePopup}
                >
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Edit Student
                  </span>
                </NavLink>
              </li>
            </ul>
          )}

          {/* fee */}
          <li onClick={() => toggleDropdown("fee")} className="nav-dropdown">
            <div className="nav-item" onClick={hidePopup}>
              <md.MdCurrencyRupee style={{ fontSize: "28px" }} />
              <span
                className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
              >
                Fee Structure
              </span>
            </div>
            {renderDropdownIcon(dropdownOpen.fee)}
          </li>
          {/* dropdown */}
          {dropdownOpen.fee && (
            <ul className="sub-menu">
              {/* add fee */}
              <li>
                <NavLink
                  to="/AddFeeStructure"
                  className="sub-item"
                  onClick={hidePopup}
                >
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Add FeeStructure
                  </span>
                </NavLink>
              </li>

              {/* edit fee */}
              <li>
                <NavLink to="/EditFee" className="sub-item" onClick={hidePopup}>
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Edit FeeStructure
                  </span>
                </NavLink>
              </li>
            </ul>
          )}

          {/* payment */}
          <li
            onClick={() => toggleDropdown("payment")}
            className="nav-dropdown"
          >
            <div className="nav-item" onClick={hidePopup}>
              <md.MdOutlinePayment style={{ fontSize: "28px" }} />
              <span
                className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
              >
                Payment
              </span>
            </div>
            {renderDropdownIcon(dropdownOpen.payment)}
          </li>
          {/* dropdown */}
          {dropdownOpen.payment && (
            <ul className="sub-menu">
              {/* fees */}
              <li>
                <NavLink
                  to="/FeesPayment"
                  className="sub-item"
                  onClick={hidePopup}
                >
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Fees
                  </span>
                </NavLink>
              </li>

              {/* hostel */}
              <li>
                <NavLink to="/Hostel" className="sub-item" onClick={hidePopup}>
                  <FaRegCircle />
                  <span
                    className={
                      sidebarToggle ? "menu-item" : "menu-item-collapse"
                    }
                  >
                    Hostel
                  </span>
                </NavLink>
              </li>
            </ul>
          )}

          {/* support */}
          <li>
            <NavLink to="/Support" className="nav-item" onClick={hidePopup}>
              <md.MdSupport style={{ fontSize: "28px" }} />
              <span
                className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
              >
                Support
              </span>
            </NavLink>
          </li>
        </ul>

        {/* popups */}
        {renderPopup()}
      </div>
    </nav>
  );
};

export default SideBar;
