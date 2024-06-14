import { useEffect } from "react"; // hook
import { NavLink } from "react-router-dom"; // navigation
import PropTypes from "prop-types"; // prop-types
import MainImg from "/broken-robot.png"; // image

// top loading bar & navbar name
const NotFound = ({ setProgress }) => {
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  return (
    <div className="flex w-full justify-center items-center h-screen dark:text-white">
      <div className="w-full flex flex-col items-center">
        {/* 404 error image */}
        <img src={MainImg} alt="404 Error" className="w-96" />

        {/* text */}
        <h1 className="text-7xl font-bold">
          We can't find the page <br /> you are looking for...
        </h1>
        <p className="text-2xl mt-4">
          You can return to our {""}
          {/* link to home page */}
          <NavLink to="/" className="text-primary">
            Home
          </NavLink>{" "}
          page.
        </p>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default NotFound;
