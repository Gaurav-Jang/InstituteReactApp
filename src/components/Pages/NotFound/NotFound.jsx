import { useEffect } from "react"; // hook
import { NavLink } from "react-router-dom"; // nav-link
import PropTypes from "prop-types"; // prop-types
import MainImg from "../../../assets/NotFound/broken-robot.png"; // image

// top loading bar & navbar name
const NotFound = ({ setPagename, setProgress }) => {
  useEffect(() => {
    setPagename("404 Not Found");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  return (
    <div className="flex w-full justify-center items-center h-screen dark:text-white">
      <div className="w-full flex flex-col items-center">
        <img src={MainImg} alt="" className="w-96" />
        {/* <p className="text3xl mb-2">
          Error code <span className="text-5xl font-bold">404</span>
        </p> */}
        <h1 className="text-7xl font-bold">
          We can't find the page <br /> you are looking for...
        </h1>
        <p className="text-2xl mt-4">
          You can return to our{" "}
          <NavLink to="/" className="text-primary">
            Home
          </NavLink>{" "}
          page.
        </p>
        {/* <button
          className="btn btn-primary mt-10 text-xl"
          type="button"
        ></button> */}
      </div>
    </div>
  );
};

NotFound.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default NotFound;
