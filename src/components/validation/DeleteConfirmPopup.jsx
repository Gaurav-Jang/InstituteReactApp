import { useEffect } from "react"; // hook
// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import PropTypes from "prop-types"; // prop types

const DeleteConfirmPopup = ({ onPopupClosed }) => {
  useEffect(() => {
    const swalInstance = Swal.fire({
      title: "Data has been deleted successfully.",
      text: "You can close this box now.",
      icon: "success",
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
  }, [onPopupClosed]); // props

  return null; // doesn't render anything
};

DeleteConfirmPopup.propTypes = {
  onPopupClosed: PropTypes.func.isRequired,
};

export default DeleteConfirmPopup;
