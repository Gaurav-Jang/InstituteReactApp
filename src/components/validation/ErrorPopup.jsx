import { useEffect } from "react"; // hook
// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import PropTypes from "prop-types"; // prop types

const ErrorPopup = ({ title, text, onPopupClosed }) => {
  useEffect(() => {
    const swalInstance = Swal.fire({
      title: title, // prop
      text: text, // prop
      icon: "error",
      confirmButtonText: "Close",
    });

    // confirmation handle
    swalInstance.then((result) => {
      // promise
      if (result.isConfirmed) {
        onPopupClosed(); // prop
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onPopupClosed(); // close
      }
    });

    return () => {
      swalInstance.close(); // Close sweetalert instance
    };
  }, [title, text, onPopupClosed]); // props

  return null; // doesn't render anything
};

ErrorPopup.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPopupClosed: PropTypes.func.isRequired,
};

export default ErrorPopup;
