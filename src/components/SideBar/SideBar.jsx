import { useState } from "react"; // hook
import { Link, NavLink } from "react-router-dom"; // navigation links
import IWS from "/iws.png"; // image
// react icons
import * as md from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaUserCircle, FaRegCircle } from "react-icons/fa";
import "../css/SideBar.css"; // sidebar css file

const SideBar = ({ sidebarToggle }) => {
  // sub menu
  const [classroomOpen, setClassroomOpen] = useState(false); // classroom dropdown
  const [studentOpen, setStudentOpen] = useState(false); // student dropdown
  const [paymentOpen, setPaymentOpen] = useState(false); // payment dropdown

  // revert classroom
  const toggleClassroom = () => {
    setClassroomOpen(!classroomOpen);
  };

  // revert payment
  const togglePayment = () => {
    setPaymentOpen(!paymentOpen);
  };

  // revert student
  const toggleStudent = () => {
    setStudentOpen(!studentOpen);
  };

  return (
    <>
      {/* main container */}
      <nav className={sidebarToggle ? "sidenav" : "sidenav-collapse"}>
        {/* company detail */}
        <div className="px-3 brand-name d-flex align-items-center">
          {/* image */}
          <Link to="/">
            <img src={IWS} alt="IWS-logo" />
          </Link>

          {/* text */}
          <h1
            style={{ fontSize: "18px" }}
            className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
          >
            <Link to="/">IWS</Link>
          </h1>
        </div>

        {/* user detail */}
        <div className="user-login py-3 px-3">
          {/* icon */}
          <FaUserCircle style={{ fontSize: "30px" }} />

          {/* text */}
          <span className={sidebarToggle ? "menu-item" : "menu-item-collapse"}>
            Admin&nbsp;User
          </span>
        </div>

        {/* navigation container */}
        <div className="nav-menu">
          {/* navigation links */}
          <ul className="px-2 my-3">
            {/* Dashboard */}
            <li>
              <NavLink to="/" className="nav-item" activeclassname="active">
                {/* icon */}
                <md.MdDashboard style={{ fontSize: "28px" }} />

                {/* text */}
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>

            {/* classroom */}
            <li onClick={toggleClassroom} className="nav-dropdown">
              <div className="nav-item">
                {/* icon */}
                <md.MdClass style={{ fontSize: "28px" }} />

                {/* text */}
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  ClassRoom
                </span>
              </div>

              {/* dropdown arrows */}
              {classroomOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />}
            </li>
            {/* sub menu */}
            {classroomOpen && (
              <ul style={{ transition: "all 0.2s ease-in-out" }}>
                {/* add classroom */}
                <li>
                  <NavLink to="/AddClassRoom" className="sub-item">
                    {/* icon */}
                    <FaRegCircle />

                    {/* text */}
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
                  <NavLink to="/EditClassRoom" className="sub-item">
                    {/* icon */}
                    <FaRegCircle />

                    {/* text */}
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
            <li onClick={toggleStudent} className="nav-dropdown">
              <div className="nav-item">
                {/* icon */}
                <PiStudentFill style={{ fontSize: "28px" }} />

                {/* text */}
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Student
                </span>
              </div>

              {/* dropdown arrows */}
              {studentOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />}
            </li>
            {/* sub menu */}
            {studentOpen && (
              <ul>
                {/* add student */}
                <li>
                  <NavLink to="/AddStudent" className="sub-item">
                    {/* icon */}
                    <FaRegCircle />

                    {/* text */}
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
                  <NavLink to="/EditStudent" className="sub-item">
                    {/* icon */}
                    <FaRegCircle />

                    {/* text */}
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

            {/* payment */}
            <li onClick={togglePayment} className="nav-dropdown">
              <div className="nav-item">
                {/* icon */}
                <md.MdOutlinePayment style={{ fontSize: "28px" }} />

                {/* text */}
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Payment
                </span>
              </div>

              {/* dropdown arrows */}
              {paymentOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />}
            </li>
            {/* sub menu */}
            {paymentOpen && (
              <ul>
                {/* Fees */}
                <li>
                  <NavLink to="/Fees" className="sub-item">
                    {/* icon */}
                    <FaRegCircle />
                    {/* text */}
                    <span
                      className={
                        sidebarToggle ? "menu-item" : "menu-item-collapse"
                      }
                    >
                      Fees
                    </span>
                  </NavLink>
                </li>

                {/* Hostel */}
                <li>
                  <NavLink to="/Hostel" className="sub-item">
                    {/* icon */}
                    <FaRegCircle />
                    {/* text */}
                    <span
                      className={
                        sidebarToggle ? "menu-item" : "menu-item-collapse"
                      }
                    >
                      {" "}
                      Hostel
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}

            {/* support */}
            <li>
              <NavLink to="/Support" className="nav-item">
                {/* icon */}
                <md.MdSupport style={{ fontSize: "28px" }} />

                {/* text */}
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Support
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
