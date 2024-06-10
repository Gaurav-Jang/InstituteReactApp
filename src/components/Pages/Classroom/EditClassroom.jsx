import PropTypes from "prop-types"; // prop-types
import axios from "axios"; // axios
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api endpoint
import { useEffect, useState } from "react"; // hooks
import { useNavigate } from "react-router-dom"; // for navigation
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md"; // react-icons
import usePopup from "../../CustomHooks/UsePopup"; // custom hook

const EditClassroom = ({ setPagename, setProgress }) => {
  const navigate = useNavigate(); // edit class navigation
  const [activeClassRoom, setActiveClassRoom] = useState([]); // data display
  const [classRoomIdToDelete, setClassRoomIdToDelete] = useState(null); // deletion using ClassRoomId

  const { renderPopup, showPopup, hidePopup } = usePopup(); // custom hook for popups

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
        showPopup("error", { message: "Failed to fetch data." });
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
        navigate("/AddClassRoom", {
          state: { classRoomData: response.data },
        }); // navigation to AddClassRoom using ClassRoomId
      })
      .catch((error) => {
        console.log(error); // console error
        showPopup("error", { message: "Failed to edit classroom." });
      });
  };

  // delete
  const handleDelete = (classRoomId) => {
    showPopup("delete", {
      onConfirm: () => confirmDelete(classRoomId), // Capture the ID directly in the closure
      onCancel: hidePopup,
    });
  };

  // Delete confirmation sweet alert modal
  const confirmDelete = (classRoomId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.DeleteClassRoom.replace("{0}", classRoomId); // Use captured ID directly
    axios
      .get(apiDeleteData)
      .then((response) => {
        getActiveClassRoom(); // Refresh the table data after deletion
        hidePopup();
        showPopup("deleteConfirm", { message: "Data Deleted Successfully!" });
      })
      .catch((error) => {
        hidePopup();
        showPopup("error", { message: "Failed to delete student." });
      });
  };

  return (
    <div
      style={{ marginLeft: "250px", marginTop: "50px" }}
      className="min-h-screen flex flex-col items-center p-4 gap-10 bg-slate-200 dark:bg-[#262450]"
    >
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

      {/* popups */}
      {renderPopup()}
    </div>
  );
};

EditClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default EditClassroom;
