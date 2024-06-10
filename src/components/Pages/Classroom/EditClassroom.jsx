import PropTypes from "prop-types"; // prop-types
import axios from "axios"; // axios
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api endpoint
import { useEffect, useState } from "react"; // hooks
import { useNavigate } from "react-router-dom"; // for navigation
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md"; // react-icons
import DeletePopup from "../../validation/DeletePopup"; // delete popup
import DeleteConfirmPopup from "../../validation/DeleteConfirmPopup"; // delete confirm popup
// react toast message
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const EditClassroom = ({ setPagename, setProgress }) => {
  const navigate = useNavigate(); // edit class navigation
  const [activeClassRoom, setActiveClassRoom] = useState([]); // data display
  const [showDeletePopup, setShowDeletePopup] = useState(false); // delete sweet error
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false); // delete sweet error
  const [classRoomIdToDelete, setClassRoomIdToDelete] = useState(null); // deletion using ClassRoomId

  // hook for displaying data
  useEffect(() => {
    getActiveClassRoom();
  }, []);

  // data displaying from database
  const getActiveClassRoom = () => {
    const apiGetData =
      InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoom; // api's endpoint
    axios
      .get(apiGetData)
      .then((response) => {
        setActiveClassRoom(response.data); // database data
      })
      .catch((error) => {
        console.log(error); // console error
        // showMessage("Failed to fetch data."); // toast error message
      });
  };

  // top loading bar + navbar
  useEffect(() => {
    setPagename("Edit ClassRoom"); // navbar page name

    // top loading bar
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  // edit
  const handleEdit = (classRoomId) => {
    const apiEditData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.EditClassRoom.replace("{0}", classRoomId); // api's endpoint
    axios
      .get(apiEditData)
      .then((response) => {
        console.log("Classroom Data:", response.data); // console error
        navigate("/add-classroom", {
          state: { classRoomData: response.data },
        }); // navigation to AddClassRoom using ClassRoomId
      })
      .catch((error) => {
        console.log(error); // console error
        showMessage("Failed to edit classroom."); // toastify error message
      });
  };

  // delete
  const handleDelete = (classRoomId) => {
    setClassRoomIdToDelete(classRoomId);
    setShowDeletePopup(true); // delete popup
  };

  // delete confirmation sweet alert modal
  const confirmDelete = () => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.DeleteClassRoom.replace(
        "{0}",
        classRoomIdToDelete // api's endpoint
      );
    axios
      .get(apiDeleteData)
      .then((response) => {
        // console.log(response.data);
        getActiveClassRoom(); // Refresh the table data after deletion
        setShowDeletePopup(false);
        setShowDeleteConfirmPopup(true);
        // showSuccessMessage("Data Deleted Successfully!"); // toastify success message
      })
      .catch((error) => {
        // console.error(error);
        setShowDeletePopup(false);
        setShowDeleteConfirmPopup(false);
        // showMessage("Failed to delete classroom."); // toastify error message
      });
  };

  // toastify error message
  // const showMessage = (msg) => {
  //   toast.error(msg, {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  // // toastify success message
  // const showSuccessMessage = (msg) => {
  //   toast.success(msg, {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <div
      style={{ marginLeft: "250px", marginTop: "50px" }}
      className=" min-h-screen flex flex-col items-center p-4 gap-10 bg-slate-200 dark:bg-[#262450]"
    >
      {/* toast message container */}
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      <div className="w-full">
        {/* table */}
        <table className="table table-striped table-bordered theme-light">
          {/* table thread */}
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">ClassRoom Name</th>
              <th scope="col">Class</th>
              <th scope="col">ClassRoom Type</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {activeClassRoom.map((classRoom, index) => (
              <tr key={classRoom.classRoomId}>
                <td>{index + 1}</td>
                <td>{classRoom.classRoomName}</td>
                <td>{classRoom.class}</td>
                <td>{classRoom.classRoomType}</td>
                <td>{classRoom.price}</td>
                <td className="space-x-4">
                  <button
                    onClick={() => handleEdit(classRoom.classRoomId)}
                    className="text-xl"
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(classRoom.classRoomId)}
                    className="text-xl"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* delete popup */}
      {showDeletePopup && <DeletePopup onConfirm={confirmDelete} />}
      {showDeleteConfirmPopup && <DeleteConfirmPopup />}
    </div>
  );
};

EditClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default EditClassroom;
