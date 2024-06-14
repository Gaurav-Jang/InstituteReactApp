// DeletePopup.js
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useEffect } from "react";

const DeletePopup = ({ onConfirm }) => {
  useEffect(() => {
    const showDeleteConfirmation = async () => {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this data?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        onConfirm();
      }
    };

    showDeleteConfirmation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onConfirm]); // Only run the effect if onConfirm changes

  return null; // renders nothing
};

export default DeletePopup;
