import React, { useState, useEffect } from "react"; // hooks
import { Routes, Route, useLocation } from "react-router-dom"; // routing - navigation
import LoadingBar from "react-top-loading-bar"; // top loading bar
// bootstrap lib's
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// components
import NavBar from "./components/NavBar/NavBar"; // navbar
import SideBar from "./components/SideBar/SideBar"; // sidebar
import Footer from "./components/Footer/Footer"; // footer
// pages
import Home from "./components/Pages/Home/Home"; // dashboard
import AddClassroom from "./components/Pages/Classroom/AddClassroom"; // add classroom
import EditClassroom from "./components/Pages/Classroom/EditClassroom"; // edit classroom
import AddStudent from "./components/Pages/Student/AddStudent"; // add student
import EditStudent from "./components/Pages/Student/EditStudent"; // edit student
import AddFee from "./components/Pages/FeeStructure/AddFee"; // add fee
import EditFee from "./components/Pages/FeeStructure/EditFee"; // edit fee
import FeesPayment from "./components/Pages/FeesPayment/FeesPayment"; // fee payment
import Support from "./components/Pages/Support/Support"; // support
import NotFound from "./components/Pages/NotFound/NotFound"; // 404
<<<<<<< HEAD
=======
import FeesPayment from "./components/Pages/FeesPayment/FeesPayment";
import AddFeesStructure from "./components/Pages/FeesStructure/AddFeesStructure";
>>>>>>> c6910733708ced4d4a47c15b63a6cea4258d2ce9

const App = () => {
  const [progress, setProgress] = useState(0); // top loading bar
  const [sidebarToggle, setSidebarToggle] = useState(true); // hamburger
  const location = useLocation(); // navigation

  // locations
  const knownPaths = [
    "/",
    "/AddClassRoom",
    "/EditClassRoom",
    "/AddStudent",
    "/EditStudent",
    "/FeesPayment",
    "/AddFee",
    "/EditFee",
    "/Support",
    "/AddFeesStructure",
  ];

  const isKnownPath = knownPaths.includes(location.pathname); // location specific

  // top loading bar on page load
  useEffect(() => {
    setProgress(100);
  }, [location.pathname]);

  return (
    <div className="h-100">
      {/* navbar */}
      {isKnownPath && (
        <NavBar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      )}

      {/* main content */}
      <div className="d-flex h-100">
        {isKnownPath && <SideBar sidebarToggle={sidebarToggle} />}
        <div className="flex-grow-1">
          {/* top loading bar */}
          <LoadingBar
            color="#0ea5e9"
            height={4}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />

          {/* pages */}
          <Routes>
            {/* dashboard */}
            <Route
              path="/"
              element={
                <Home
                  setProgress={setProgress}
                  sidebarToggle={sidebarToggle}
                  setSidebarToggle={setSidebarToggle}
                />
              }
            />

            {/* add classroom */}
            <Route
              path="/AddClassRoom"
              element={<AddClassroom setProgress={setProgress} />}
            />

            {/* edit classroom */}
            <Route
              path="/EditClassRoom"
              element={<EditClassroom setProgress={setProgress} />}
            />

            {/* add student */}
            <Route
              path="/AddStudent"
              element={<AddStudent setProgress={setProgress} />}
            />

            {/* edit student */}
            <Route
              path="/EditStudent"
              element={<EditStudent setProgress={setProgress} />}
            />

<<<<<<< HEAD
            {/* add fee */}
            <Route
              path="/AddFee"
              element={<AddFee setProgress={setProgress} />}
            />

            {/* edit fee */}
            <Route
              path="/EditFee"
              element={<EditFee setProgress={setProgress} />}
            />

=======
            {/* Add FeesStructure */}
            <Route
              path="/AddFeesStructure"
              element={<AddFeesStructure setProgress={setProgress} />}
            />
>>>>>>> c6910733708ced4d4a47c15b63a6cea4258d2ce9
            {/* fees payment */}
            <Route
              path="/FeesPayment"
              element={<FeesPayment setProgress={setProgress} />}
            />

            {/* support */}
            <Route
              path="/Support"
              element={<Support setProgress={setProgress} />}
            />

            {/* 404 not found */}
            <Route path="*" element={<NotFound setProgress={setProgress} />} />
          </Routes>
        </div>
      </div>

      {/* footer */}
      {isKnownPath && <Footer />}
    </div>
  );
};

export default App;
