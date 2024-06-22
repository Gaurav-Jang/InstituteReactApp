import { useEffect } from "react"; // hook
// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import PropTypes from "prop-types"; // prop type

const SuccessPopup = ({ title, confirmBtn, link, onPopupClosed }) => {
  useEffect(() => {
    const swalInstance = Swal.fire({
      title: title, // prop
      text: "Thank You!",
      icon: "success",
      // cancel button
      showCancelButton: true,
      cancelButtonColor: "#a5a0b7",
      cancelButtonText: "Close",
      // confirm button
      showConfirmButton: confirmBtn,
      confirmButtonColor: "#3085d6",
      confirmButtonText: `<a href="${link}" style="color:white;text-decoration:none;">Edit ClassRoom</a>`, // prop
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
  }, [title, link, onPopupClosed]); // props

  return null; // doesn't render anything
};

SuccessPopup.propTypes = {
  title: PropTypes.string.isRequired,
  confirmBtn: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  onPopupClosed: PropTypes.func.isRequired,
};

export default SuccessPopup;
