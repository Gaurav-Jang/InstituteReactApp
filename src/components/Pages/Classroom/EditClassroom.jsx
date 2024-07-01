import { useEffect, useState } from "react"; // hooks
import PropTypes from "prop-types"; // pro-types
import axios from "axios"; // axios
import { PencilSquare, Trash, Search } from "react-bootstrap-icons"; // react-bootstraps icon
import { useNavigate } from "react-router-dom"; // navigation
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/EditClassRoom.css"; // custom css file
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint

const EditClassroom = ({ setProgress }) => {
  const navigate = useNavigate(); // navigation
  const [activeClassRoom, setActiveClassRoom] = useState([]); // classroom
  const { renderPopup, showPopup, hidePopup } = usePopup(); // popup
  const [searchItem, setSearchItem] = useState(""); // search

  // classroom api hook
  useEffect(() => {
    getActiveClassRoom();
  }, []);

  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // classroom api
  const getActiveClassRoom = async () => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoom; // api's endpoint
      const response = await axios.get(apiGetData);
      setActiveClassRoom(response.data); // data
    } catch (error) {
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      }); // show error popup
    }
  };

  // edit
  const handleEdit = (classRoomId) => {
    navigate(`/AddClassRoom?ClassRoomId=${classRoomId}`); // api's endpoint
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
  const confirmDelete = (classRoomId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.DeleteClassRoom.replace("{0}", classRoomId); // api's endpoint
    axios
      .get(apiDeleteData)
      .then((response) => {
        getActiveClassRoom(); // data
        hidePopup(); // hide all the popups
        showPopup("deleteConfirm"); // shows delete confirm popup
      })
      .catch((error) => {
        hidePopup(); // hide all the popups
        showPopup("error", {
          title: "Error!",
          text: "Server is down. Please try again later.",
        });
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
          marginLeft: "auto",
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
              {/* table body row */}
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
                        className="btn text-primary"
                        onClick={() => handleEdit(classRoom.classRoomId)}
                      >
                        <PencilSquare />
                      </button>

                      {/* delete */}
                      <button
                        className="btn text-danger"
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
    </>
  );
};

EditClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default EditClassroom;
