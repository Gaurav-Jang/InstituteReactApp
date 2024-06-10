// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const SuccessPopup = () => {
  Swal.fire({
    title: "Success!",
    text: "Thank You!",
    icon: "success",
    confirmButtonText: "Close",
  });

  return <></>;
};

export default SuccessPopup;
