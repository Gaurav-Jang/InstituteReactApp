import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import AddClassroom from "./components/Pages/Classroom/AddClassroom";
import EditClassroom from "./components/Pages/Classroom/EditClassroom";
import AddStudent from "./components/Pages/Student/AddStudent";
import EditStudent from "./components/Pages/Student/EditStudent";
import Payment from "./components/Pages/Payment/Payment";
import Support from "./components/Pages/Support/Support";
import NotFound from "./components/Pages/NotFound/NotFound";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const location = useLocation();

  const knownPaths = [
    "/",
    "/AddClassRoom",
    "/EditClassRoom",
    "/AddStudent",
    "/EditStudent",
    "/Payment",
    "/Support",
  ];

  const isKnownPath = knownPaths.includes(location.pathname);

  useEffect(() => {
    setProgress(100);
  }, [location.pathname]);

  return (
    <div className="h-100">
      {isKnownPath && (
        <NavBar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      )}
      <div className="d-flex h-100">
        {isKnownPath && <SideBar sidebarToggle={sidebarToggle} />}
        <div className="flex-grow-1">
          <LoadingBar
            color="#0ea5e9"
            height={4}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
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
            <Route
              path="/AddClassRoom"
              element={<AddClassroom setProgress={setProgress} />}
            />
            <Route
              path="/EditClassRoom"
              element={<EditClassroom setProgress={setProgress} />}
            />
            <Route
              path="/AddStudent"
              element={<AddStudent setProgress={setProgress} />}
            />
            <Route
              path="/EditStudent"
              element={<EditStudent setProgress={setProgress} />}
            />
            <Route
              path="/Payment"
              element={<Payment setProgress={setProgress} />}
            />
            <Route
              path="/Support"
              element={<Support setProgress={setProgress} />}
            />
            <Route path="*" element={<NotFound setProgress={setProgress} />} />
          </Routes>
        </div>
      </div>
      {isKnownPath && <Footer />}
    </div>
  );
};

export default App;
