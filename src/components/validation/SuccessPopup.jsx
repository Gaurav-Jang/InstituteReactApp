// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import PropTypes from "prop-types"; // Import PropTypes

const SuccessPopup = ({ title, link }) => {
  Swal.fire({
    title: title,
    text: "Thank You!",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `<a href="${link}" style="color:white;text-decoration:none;">Edit ClassRoom</a>`,
  });

  return <></>;
};

SuccessPopup.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SuccessPopup;
