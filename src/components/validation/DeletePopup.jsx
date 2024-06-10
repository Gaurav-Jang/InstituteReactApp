// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useEffect } from "react"; // hook

const DeletePopup = ({ onConfirm }) => {
  useEffect(() => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // a promise of deletion
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }, [onConfirm]);

  return null; // renders nothing
};

export default DeletePopup;
