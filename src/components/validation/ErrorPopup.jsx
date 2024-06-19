// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import PropTypes from "prop-types"; // Import PropTypes

const ErrorPopup = ({ title, text }) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    confirmButtonText: "Close",
  });

  return <></>;
};

ErrorPopup.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ErrorPopup;
