import PropTypes from "prop-types"; // prop-types
import axios from "axios"; // axios
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api endpoint
import { useEffect, useState } from "react"; // hooks
import { useNavigate } from "react-router-dom"; // for navigation
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md"; // react-icons
import usePopup from "../../CustomHooks/usePopup"; // custom hook

const EditStudent = ({ setProgress }) => {
  const navigate = useNavigate(); // for navigation
  const [activeStudent, setActiveStudent] = useState([]); // state to hold student data

  // custom hook for managing popups
  const { renderPopup, showPopup, hidePopup } = usePopup();

  // Fetch active students from the API on component mount
  useEffect(() => {
    getActiveStudent();
  }, []);

  const getActiveStudent = () => {
    const apiGetData =
      InstituteSoft.BaseURL + InstituteSoft.Student.GetActiveStudent;
    axios
      .get(apiGetData)
      .then((response) => {
        setActiveStudent(response.data);
      })
      .catch((error) => {
        showPopup("error", { message: "Failed to fetch data." });
      });
  };

  // Set page name and progress bar on component mount
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // Handle edit action
  const handleEdit = (studentId) => {
    const apiEditData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.EditClassRoom.replace("{0}", studentId);
    axios
      .get(apiEditData)
      .then((response) => {
        navigate("/AddStudent", {
          state: { StudentData: response.data },
        });
      })
      .catch((error) => {
        showPopup("error", { message: "Failed to edit student." });
      });
  };

  // delete
  const handleDelete = (studentId) => {
    showPopup("delete", {
      onConfirm: () => confirmDelete(studentId), // Capture the ID directly in the closure
      onCancel: hidePopup,
    });
  };

  // Delete confirmation sweet alert modal
  const confirmDelete = (studentId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.Student.DeleteStudent.replace("{0}", studentId); // Use captured ID directly
    axios
      .get(apiDeleteData)
      .then((response) => {
        getActiveStudent(); // Refresh the table data after deletion
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
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Student Name</th>
              <th scope="col">Father Name</th>
              <th scope="col">Father Mobile Number</th>
              <th scope="col">ClassRoom</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeStudent.map((Student, index) => (
              <tr key={Student.studentId}>
                <td>{index + 1}</td>
                <td>{Student.studentFirstName}</td>
                <td>{Student.fatherFirstName}</td>
                <td>{Student.fatherMobileNumber}</td>
                <td>{Student.studentClassRoomName}</td>
                <td>{Student.address}</td>
                <td className="space-x-4">
                  <button
                    onClick={() => handleEdit(Student.studentId)}
                    className="text-xl"
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(Student.studentId)}
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

EditStudent.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default EditStudent;
