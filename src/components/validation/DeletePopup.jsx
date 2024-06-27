import { useEffect } from "react"; // hook
// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const DeletePopup = ({ onConfirm }) => {
  useEffect(() => {
    const showDeleteConfirmation = async () => {
      try {
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
      } catch (error) {
        console.error("Error in SweetAlert:", error);
      }
    };

    // onConfirm promise
    showDeleteConfirmation(); // shows deleteConfirm popup
  }, [onConfirm]);

  return null; // doesn't render anything
};

export default DeletePopup;
