// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ErrorPopup = () => {
  Swal.fire({
    title: "Error!",
    text: "Complete the form.",
    icon: "error",
    confirmButtonText: "Close",
  });

  return <></>;
};

export default ErrorPopup;
