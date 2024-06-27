import { useEffect } from "react";
import PropTypes from "prop-types";
import Hero from "../../Hero/Hero";

const Home = ({ setProgress }) => {
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  return (
    <>
      <div className="">
        <Hero />
      </div>
    </>
  );
};

Home.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default Home;
