import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  PencilSquare,
  Trash,
  ArrowUp,
  ArrowDown,
  Search,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import usePopup from "../../CustomHooks/usePopup";
import "../../css/EditClassRoom.css"; // Ensure your custom CSS is correctly imported
import InstituteSoft from "../../ApiEndPoints/InstituteSoft";

const EditClassroom = ({ setPagename, setProgress }) => {
  const navigate = useNavigate();
  const [activeClassRoom, setActiveClassRoom] = useState([]);
  const { renderPopup, showPopup, hidePopup } = usePopup();
  const [searchItem, setSearchItem] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    setPagename("Edit ClassRoom");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  useEffect(() => {
    getActiveClassRoom();
  }, []);

  const getActiveClassRoom = async () => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoom;
      const response = await axios.get(apiGetData);
      setActiveClassRoom(response.data);
    } catch (error) {
      showPopup("error");
    }
  };

  const handleEdit = (classRoomId) => {
    navigate(`/AddClassRoom?ClassRoomId=${classRoomId}`);
  };

  const handleDelete = (classRoomId) => {
    showPopup("delete", {
      onConfirm: () => confirmDelete(classRoomId),
      onCancel: hidePopup,
    });
  };

  const confirmDelete = async (classRoomId) => {
    try {
      const apiDeleteData =
        InstituteSoft.BaseURL +
        InstituteSoft.ClassRoom.DeleteClassRoom.replace("{0}", classRoomId);
      await axios.delete(apiDeleteData);
      getActiveClassRoom();
      hidePopup();
      showPopup("deleteConfirm");
    } catch (error) {
      hidePopup();
      showPopup("error");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedClassRooms = [...activeClassRoom].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredClassRooms = sortedClassRooms.filter((classRoom) =>
    classRoom.classRoomName.toLowerCase().includes(searchItem.toLowerCase())
  );

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? <ArrowUp /> : <ArrowDown />;
    }
    return null;
  };

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    hidePopup();
  };

  return (
    <div className="edit-container">
      <div className="flex gap-4 align-items-center mb-3">
        <Search className="text-2xl" />
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by ClassRoom Name"
          value={searchItem}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <table className="table table-striped table-bordered fixed-header">
          <thead className="thread-light">
            <tr className="">
              <th scope="col">S.No</th>
              <th scope="col" onClick={() => requestSort("classRoomName")}>
                ClassRoom Name {getSortIcon("classRoomName")}
              </th>
              <th scope="col" onClick={() => requestSort("class")}>
                Class {getSortIcon("class")}
              </th>
              <th scope="col" onClick={() => requestSort("classRoomType")}>
                ClassRoom Type {getSortIcon("classRoomType")}
              </th>
              <th scope="col" onClick={() => requestSort("price")}>
                Price {getSortIcon("price")}
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredClassRooms.map((classRoom, index) => (
              <tr key={classRoom.classRoomId}>
                <td>{index + 1}</td>
                <td>{classRoom.classRoomName}</td>
                <td>{classRoom.class}</td>
                <td>{classRoom.classRoomType}</td>
                <td>{classRoom.price}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleEdit(classRoom.classRoomId)}
                  >
                    <PencilSquare />
                  </button>
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

      {renderPopup()}
    </div>
  );
};

EditClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default EditClassroom;
