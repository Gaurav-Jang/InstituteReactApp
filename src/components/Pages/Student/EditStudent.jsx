import { useEffect, useState } from "react"; // hooks
import PropTypes from "prop-types"; // prop-types
import axios from "axios"; // axios
import { PencilSquare, Trash, Search } from "react-bootstrap-icons"; // react-bootstraps icon
import { useNavigate } from "react-router-dom"; // navigation
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/EditClassRoom.css"; // custom css file
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api endpoint

const EditStudent = ({ setProgress }) => {
  const navigate = useNavigate(); // navigation
  const [activeStudent, setActiveStudent] = useState([]); // student
  const { renderPopup, showPopup, hidePopup } = usePopup(); // popup
  const [searchItem, setSearchItem] = useState(""); // search

  // student api hook
  useEffect(() => {
    getActiveStudent();
  }, []);

  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // student api
  const getActiveStudent = async () => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL + InstituteSoft.Student.GetActiveStudent; // api's endpoint
      const response = await axios.get(apiGetData);
      setActiveStudent(response.data); // data
    } catch (error) {
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      }); // show error popup
    }
  };

  // edit
  const handleEdit = (studentId) => {
    navigate(`/AddStudent?StudentId=${studentId}`); // api's endpoint
  };

  // delete
  const handleDelete = (classRoomId) => {
    showPopup("delete", {
      // shows delete popup
      onConfirm: () => confirmDelete(classRoomId),
      onCancel: hidePopup, // hide all the popups on cancel button
    });
  };

  // confirm delete
  const confirmDelete = (studentId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.Student.DeleteStudent.replace("{0}", studentId); // api's endpoint
    axios
      .get(apiDeleteData)
      .then((response) => {
        getActiveStudent(); // data
        hidePopup(); // hide all the popups
        showPopup("deleteConfirm"); // shows delete confirm popup
      })
      .catch((error) => {
        hidePopup(); // hide all the popups
        showPopup("error", {
          title: "Error!",
          text: "Server is down. Please try again later.",
        }); // show error popup
      });
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    hidePopup(); // hide all the popups
  };

  return (
    <>
      <div
        style={{
          marginLeft: "250px",
          backgroundColor: "#FBFBFE",
          width: "calc(100% - 250px)",
          height: "calc(100% - 50px)",
          backgroundImage: "url(/backGround.webp)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="edit-container"
      >
        {/* search */}
        <div className="search-container">
          {/* search icon */}
          <Search className="text-2xl" />

          {/* search box */}
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by ClassRoom Name"
            value={searchItem}
            onChange={handleInputChange}
          />
        </div>

        {/* table */}
        <div className="table-container">
          <table className="table table-striped table-bordered fixed-header">
            {/* table head */}
            <thead>
              {/* table head row */}
              <tr>
                {/* s.no */}
                <th scope="col">S.No</th>
                {/* student name */}
                <th scope="col">Student Name</th>
                {/* father name */}
                <th scope="col">Father Name</th>
                {/* father mobile number */}
                <th scope="col">Father Mobile Number</th>
                {/* classroom name */}
                <th scope="col">ClassRoom</th>
                {/* address */}
                <th scope="col">Address</th>
                {/* buttons */}
                <th scope="col">Action</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody>
              {/* table body row */}
              {activeStudent
                .filter((student) =>
                  student.studentFirstName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
                )
                .map((student, index) => (
                  <tr key={student.studentId}>
                    {/* s.no */}
                    <td>{index + 1}</td>
                    {/* student name */}
                    <td>{student.studentFirstName}</td>
                    {/* father name */}
                    <td>{student.fatherFirstName}</td>
                    {/* father mobile number */}
                    <td>{student.fatherMobileNumber}</td>
                    {/* classroom name */}
                    <td>{student.studentClassRoomName}</td>
                    {/* address */}
                    <td>{student.address}</td>
                    {/* buttons */}
                    <td>
                      {/* edit */}
                      <button
                        className="btn text-primary"
                        onClick={() => handleEdit(student.studentId)}
                      >
                        <PencilSquare />
                      </button>

                      {/* delete */}
                      <button
                        className="btn text-danger"
                        onClick={() => handleDelete(student.studentId)}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* popup */}
        {renderPopup()}
      </div>
    </>
  );
};

EditStudent.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default EditStudent;
