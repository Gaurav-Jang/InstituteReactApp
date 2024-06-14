import { useEffect, useState } from "react"; // hooks
import PropTypes from "prop-types"; // prop-types
import axios from "axios"; // axios
import { PencilSquare, Trash, Search } from "react-bootstrap-icons"; // bootstrap icons
import { useNavigate } from "react-router-dom"; // navigation
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/EditClassRoom.css"; // css file
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint file

const EditClassroom = ({ setPagename, setProgress }) => {
  const navigate = useNavigate(); // navigation
  const [activeClassRoom, setActiveClassRoom] = useState([]); // fetch classroom data from db
  const { renderPopup, showPopup, hidePopup } = usePopup(); // custom hook
  const [searchItem, setSearchItem] = useState(""); // search box

  useEffect(() => {
    getActiveClassRoom();
  }, []);

  // top nav loading + page name
  useEffect(() => {
    setPagename("Edit ClassRoom");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  // classroom api
  const getActiveClassRoom = async () => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoom; // api's endpoint
      const response = await axios.get(apiGetData);
      setActiveClassRoom(response.data); // data
    } catch (error) {
      showPopup("error"); // shows error popup
    }
  };

  // edit
  const handleEdit = (classRoomId) => {
    navigate(`/AddClassRoom?ClassRoomId=${classRoomId}`); // redirects to the AddClassRoom page with the specific ClassRoomId
  };

  // delete
  const handleDelete = (classRoomId) => {
    showPopup("delete", {
      onConfirm: () => confirmDelete(classRoomId),
      onCancel: hidePopup, // hide all popups
    });
  };

  // delete api
  const confirmDelete = (classRoomId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.DeleteClassRoom.replace("{0}", classRoomId);
    axios
      .get(apiDeleteData)
      .then((response) => {
        getActiveClassRoom(); // gets the data
        hidePopup(); // hide all popups
        showPopup("deleteConfirm"); // show delete confirmation popup
      })
      .catch((error) => {
        hidePopup(); // hide all popups
        showPopup("error"); // show error popup
      });
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    hidePopup(); // hide all popups
  };

  return (
    <div className="edit-container">
      {/* search */}
      <div className="flex gap-4 align-items-center mb-3">
        {/* search icon */}
        <Search className="text-2xl" />
        {/* search input */}
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by ClassRoom Name"
          value={searchItem}
          onChange={handleInputChange}
        />
      </div>

      {/* table */}
      <div>
        <table className="table table-striped table-bordered fixed-header">
          {/* table head */}
          <thead className="thread-light">
            <tr className="">
              {/* s.no */}
              <th scope="col">S.No</th>
              {/* classroom name */}
              <th scope="col">ClassRoom Name</th>
              {/* class */}
              <th scope="col">Class</th>
              {/* classroom type */}
              <th scope="col">ClassRoom Type</th>
              {/* price */}
              <th scope="col">Price</th>
              {/* buttons */}
              <th scope="col">Action</th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {activeClassRoom
              .filter((classRoom) =>
                classRoom.classRoomName
                  .toLowerCase()
                  .includes(searchItem.toLowerCase())
              )
              .map((classRoom, index) => (
                <tr key={classRoom.classRoomId}>
                  {/* s.no */}
                  <td>{index + 1}</td>
                  {/* classroom name */}
                  <td>{classRoom.classRoomName}</td>
                  {/* class */}
                  <td>{classRoom.class}</td>
                  {/* classroom type */}
                  <td>{classRoom.classRoomType}</td>
                  {/* price */}
                  <td>{classRoom.price}</td>
                  {/* buttons */}
                  <td>
                    {/* edit */}
                    <button
                      className="btn"
                      onClick={() => handleEdit(classRoom.classRoomId)}
                    >
                      <PencilSquare />
                    </button>

                    {/* delete */}
                    <button
                      className="btn"
                      onClick={() => handleDelete(classRoom.classRoomId)}
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
  );
};

EditClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default EditClassroom;
