import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../CSS/SideBar.css";
import IWS from "/iws.png";
import * as md from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaUserCircle, FaRegCircle } from "react-icons/fa";

const SideBar = ({ sidebarToggle }) => {
  // sub menu
  const [classroomOpen, setClassroomOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);

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
      <nav className={sidebarToggle ? "sidenav" : "sidenav-collapse"}>
        <div className="px-3 py-3 brand-name d-flex align-items-center">
          <Link to="/">
            <img src={IWS} />
          </Link>
          <h4
            style={{ fontSize: "18px" }}
            className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
          >
            <Link to="/">Infinite Web Solutions</Link>
          </h4>
        </div>
        <div className="user-login">
          <h5 className="py-3 px-3">
            <FaUserCircle style={{ fontSize: "30px" }} />
            <span
              className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
            >
              Admin&nbsp;User
            </span>
          </h5>
        </div>
        <div className="nav-menu">
          <ul className="px-2 my-3">
            <li>
              <NavLink to="/" className="nav-item" activeclassname="active">
                <md.MdDashboard style={{ fontSize: "28px" }} />
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li onClick={toggleClassroom} className="nav-dropdown">
              <div className="nav-item">
                <md.MdClass style={{ fontSize: "28px" }} />
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  ClassRoom
                </span>
              </div>

              {classroomOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />}
            </li>
            {classroomOpen && (
              // sub menu
              <ul style={{ transition: "all 0.2s ease-in-out" }}>
                {/* add classroom */}
                <li>
                  <NavLink to="/AddClassRoom" className="sub-item">
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
                  <NavLink to="/EditClassRoom" className="sub-item">
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
            <li onClick={toggleStudent} className="nav-dropdown">
              <div className="nav-item">
                <PiStudentFill style={{ fontSize: "28px" }} />
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Student
                </span>
              </div>

              {studentOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />}
            </li>
            {studentOpen && (
              // sub menu
              <ul>
                {/* add student */}
                <li>
                  <NavLink to="/AddStudent" className="sub-item">
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
                  <NavLink to="/EditStudent" className="sub-item">
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
            <li onClick={togglePayment} className="nav-dropdown">
              <div className="nav-item">
                <md.MdOutlinePayment style={{ fontSize: "28px" }} />
                <span
                  className={sidebarToggle ? "menu-item" : "menu-item-collapse"}
                >
                  Payment
                </span>
              </div>
              {paymentOpen ? <md.MdArrowDropUp /> : <md.MdArrowDropDown />}
            </li>
            {paymentOpen && (
              // sub menu
              <ul>
                {/* Fees */}
                <li>
                  <NavLink to="/Fees" className="sub-item">
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

                {/* Hostel */}
                <li>
                  <NavLink to="/Hostel" className="sub-item">
                    <FaRegCircle />
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
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
