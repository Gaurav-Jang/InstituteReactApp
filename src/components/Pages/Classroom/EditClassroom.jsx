import PropTypes from "prop-types"; // prop-types
import axios from "axios";
import InstituteSoft from "../../ApiEndPoints/InstituteSoft";
import { useEffect, useState } from "react"; // hooks
import { useNavigate } from "react-router-dom"; // for navigation
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

// top loading bar & navbar name
const EditClassroom = ({ setPagename, setProgress }) => {
  const [activeClassRoom, setActiveClassRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getActiveClassRoom();
  }, []);

  const getActiveClassRoom = () => {
    const apiGetData =
      InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoom;
    axios
      .get(apiGetData)
      .then((response) => {
        setActiveClassRoom(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setPagename("Edit ClassRoom");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  // edit

  const handleEdit = (classRoomId) => {
    // navigate(`/AddClassRoom/${classRoomId}`);
    const apiEditData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.EditClassRoom.replace("{0}", classRoomId);
    axios.get(apiEditData).then((response) => {
      //stuck
    });
  };

  // delete
  const handleDelete = (classRoomId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.DeleteClassRoom.replace("{0}", classRoomId);
    axios
      .get(apiDeleteData)
      .then((response) => {
        console.log("Classroom deleted:", response.data);
        getActiveClassRoom(); // Refresh the table data after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{ marginLeft: "250px" }}
      className=" min-h-screen flex flex-col justify-between items-center p-4 gap-10 bg-slate-200 dark:bg-[#262450] "
    >
      {/* table */}
      <table
        className="table table-striped table-bordered table-light"
        style={{ marginTop: "50px" }}
      >
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
  );
};

EditClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default EditClassroom;
