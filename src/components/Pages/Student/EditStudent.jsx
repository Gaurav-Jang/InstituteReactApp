import PropTypes from "prop-types"; // prop-types
// api
import axios from "axios";
import InstituteSoft from "../../ApiEndPoints/InstituteSoft";
import { useEffect, useState } from "react"; // hooks
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import DeletePopup from "../../validation/DeletePopup"; // delete popup
import DeleteConfirmPopup from "../../validation/DeleteConfirmPopup"; // delete confirm popup

// top loading bar & navbar name
const EditStudent = ({ setPagename, setProgress }) => {
  // API
  const [activeStudent, setActiveStudent] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false); // delete sweet error
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false); // delete sweet error
  const [studentIdToDelete, setStudentToDelete] = useState(null); // deletion using StudentId
  useEffect(() => {
    GetActiveStudent();
  }, []);

  const GetActiveStudent = () => {
    const apiGetData =
      InstituteSoft.BaseURL + InstituteSoft.Student.GetActiveStudent;
    axios
      .get(apiGetData)
      .then((response) => {
        setActiveStudent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setPagename("Edit Student");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  const handleDelete = (studentId) => {
    debugger;
    setStudentToDelete(studentId);
    debugger;
    setShowDeletePopup(true); // delete popup
  };

  // delete confirmation sweet alert modal
  const confirmDelete = () => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.Student.DeleteStudent.replace(
        "{0}",
        studentIdToDelete // api's endpoint
      );
    axios
      .get(apiDeleteData)
      .then((response) => {
        console.log(response.data);
        GetActiveStudent(); // Refresh the table data after deletion
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

  return (
    <div
      style={{ marginLeft: "250px" }}
      className=" min-h-screen flex flex-col justify-between items-center p-4 gap-10 bg-slate-200 dark:bg-[#262450] rounded-3xl"
    >
      {/* table */}
      <table
        style={{ marginTop: "50px" }}
        className="table table-striped table-bordered table-light dark:table-dark"
      >
        {/* table thread */}
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Student Name</th>
            <th scope="col">Father Name</th>
            <th scope="col">Father Mobile Number</th>
            <th scope="col">ClassRoom</th>
            <th scope="col">Address</th>
            <th scope="col">Remarks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {activeStudent.map((Student, index) => (
            <tr key={Student.studentId}>
              <td>{index + 1}</td>
              <td>{Student.studentFirstName}</td>
              <td>{Student.fatherFirstName}</td>
              <td>{Student.fatherMobileNumber}</td>
              <td>{Student.studentClassRoomName}</td>
              <td>{Student.address}</td>
              <td>{Student.remarks}</td>
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
      {showDeletePopup && <DeletePopup onConfirm={confirmDelete} />}
      {showDeleteConfirmPopup && <DeleteConfirmPopup />}
    </div>
  );
};

EditStudent.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default EditStudent;
