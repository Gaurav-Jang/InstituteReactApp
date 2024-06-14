import LoadingBar from "react-top-loading-bar"; // top loading bar
import { Routes, Route, useLocation } from "react-router-dom"; // router dom
import { useState, useEffect } from "react"; // hooks
// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// components
import SideBar from "./components/SideBar/SideBar"; // sidebar
import NavBar from "./components/NavBar/NavBar"; // navbar
import Footer from "./components/Footer/Footer"; // footer
// pages
import Home from "./components/Pages/Home/Home"; // home page
import AddClassroom from "./components/Pages/Classroom/AddClassroom"; // add classroom page
import EditClassroom from "./components/Pages/Classroom/EditClassroom"; // edit classroom page
import AddStudent from "./components/Pages/Student/AddStudent"; // add student page
import EditStudent from "./components/Pages/Student/EditStudent"; // edit student
import Payment from "./components/Pages/Payment/Payment"; // payment page
import Support from "./components/Pages/Support/Support"; // support page
import NotFound from "./components/Pages/NotFound/NotFound"; // not found page

const App = () => {
  // top loading bar function
  const [progress, setProgress] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [pagename, setPagename] = useState(""); // Initialize pagename properly

  // Get current location
  const location = useLocation();

  // Defining known paths and their names
  const knownPaths = [
    // home page
    { path: "/", name: "Dashboard" },
    // classroom pages
    { path: "/AddClassRoom", name: "Add Classroom" },
    { path: "/EditClassRoom", name: "Edit Classroom" },
    // student pages
    { path: "/AddStudent", name: "Add Student" },
    { path: "/EditStudent", name: "Edit Student" },
    // payment page
    { path: "/Payment", name: "Payment" },
    // support page
    { path: "/Support", name: "Support" },
  ];

  // Update pagename based on current location
  useEffect(() => {
    const currentPath = knownPaths.find(
      (item) => item.path === location.pathname
    );
    if (currentPath) {
      setPagename(currentPath.name);
    } else {
      setPagename("");
    }
  }, [location.pathname]);

  // Check if the current path is known
  const isKnownPath = knownPaths.some(
    (item) => item.path === location.pathname
  );

  return (
    <div>
      {/* container */}
      <div className="h-100">
        {/* navbar */}
        <nav>
          {isKnownPath && (
            <NavBar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              pagename={pagename}
            />
          )}
        </nav>

        {/* main div */}
        <div className="h-100">
          {/* sidebar */}
          <div>{isKnownPath && <SideBar sidebarToggle={sidebarToggle} />}</div>

          {/* content box */}
          <div>
            {/* top loading bar */}
            <LoadingBar
              color="#0ea5e9"
              height={4}
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
            />

            {/* routing */}
            <Routes>
              {/* home page */}
              <Route
                path="/"
                element={
                  <Home
                    setProgress={setProgress}
                    setPagename={setPagename}
                    sidebarToggle={sidebarToggle}
                    setSidebarToggle={setSidebarToggle}
                  />
                }
              />

              {/* add classroom page */}
              <Route
                path="/AddClassRoom"
                element={
                  <AddClassroom
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />

              {/* edit classroom page */}
              <Route
                path="/EditClassRoom"
                element={
                  <EditClassroom
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />

              {/* add student page */}
              <Route
                path="/AddStudent"
                element={
                  <AddStudent
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />

              {/* edit student page */}
              <Route
                path="/EditStudent"
                element={
                  <EditStudent
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />

              {/* payment page */}
              <Route
                path="/Payment"
                element={
                  <Payment
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />

              {/* support page */}
              <Route
                path="/Support"
                element={
                  <Support
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />

              {/* 404 -- not found page */}
              <Route
                path="*"
                element={
                  <NotFound
                    setProgress={setProgress}
                    setPagename={setPagename}
                  />
                }
              />
            </Routes>
          </div>
        </div>

        {/* footer */}
        <footer>{isKnownPath && <Footer />}</footer>
      </div>
    </div>
  );
};

export default App;
