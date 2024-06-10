// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const SuccessPopup = () => {
  Swal.fire({
    title: "ClassRoom is added successfully.",
    text: "You can close this box now.",
    icon: "success",
    confirmButtonText: "Close",
  });

  return null;
};

export default SuccessPopup;
