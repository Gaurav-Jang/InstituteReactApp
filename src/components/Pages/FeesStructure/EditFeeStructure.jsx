import { useEffect, useState } from "react"; // hooks
import PropTypes from "prop-types"; // pro-types
import axios from "axios"; // axios
import { PencilSquare, Trash, Search } from "react-bootstrap-icons"; // react-bootstraps icon
import { useNavigate } from "react-router-dom"; // navigation
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/EditClassRoom.css"; // custom css file
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint

const EditFeeStructure = ({ setProgress }) => {
  const navigate = useNavigate(); // navigation
  const [activeFeeStructure, setActiveFeeStructure] = useState([]); // fee structure
  const { renderPopup, showPopup, hidePopup } = usePopup(); // popup
  const [searchItem, setSearchItem] = useState(""); // search

  // fee structure api hook
  useEffect(() => {
    getActiveFeeStructure();
  }, []);

  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // fee structure api
  const getActiveFeeStructure = async () => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL +
        InstituteSoft.FeeStructure.GetActiveFeeStructure; // api's endpoint
      const response = await axios.get(apiGetData);
      setActiveFeeStructure(response.data); // data
    } catch (error) {
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      }); // show error popup
    }
  };

  // edit
  const handleEdit = (feeStructureId) => {
    navigate(`/AddFeeStructure?FeeStructureId=${feeStructureId}`); // api's endpoint
  };

  // delete
  const handleDelete = (feeStructureId) => {
    showPopup("delete", {
      // shows delete popup
      onConfirm: () => confirmDelete(feeStructureId),
      onCancel: hidePopup, // hide all the popups on cancel button
    });
  };

  // confirm delete
  const confirmDelete = (feeStructureId) => {
    const apiDeleteData =
      InstituteSoft.BaseURL +
      InstituteSoft.FeeStructure.DeleteFeeStructure.replace(
        "{0}",
        feeStructureId
      ); // api's endpoint
    axios
      .get(apiDeleteData)
      .then((response) => {
        getActiveFeeStructure(); // data
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
            placeholder="Search by Class Name"
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
                {/* class */}
                <th scope="col">Class</th>
                {/* registration fee */}
                <th scope="col">Registration Fee</th>
                {/* admission fee */}
                <th scope="col">Admission Fee</th>
                {/* tuition fee */}
                <th scope="col">Tuition Fee</th>
                {/* welcome kit */}
                <th scope="col">Welcome Kit</th>
                {/* school fee */}
                <th scope="col">School Fee</th>
                {/* migration charges */}
                <th scope="col">Migration Charges</th>
                {/* buttons */}
                <th scope="col">Action</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody>
              {/* table body row */}
              {activeFeeStructure
                .filter(
                  (feeStructure) =>
                    feeStructure.studentClass &&
                    feeStructure.studentClass
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                )
                .map((feeStructure) => (
                  <tr key={feeStructure.feeStructureId}>
                    {/* class */}
                    <td>{feeStructure.studentClass}</td>
                    {/* registration fee */}
                    <td>{feeStructure.registrationFees}</td>
                    {/* admission fee */}
                    <td>{feeStructure.admissionFees}</td>
                    {/* tuition fee */}
                    <td>{feeStructure.tuitionFees}</td>
                    {/* welcome kit */}
                    <td>{feeStructure.welcomeKit}</td>
                    {/* school fee */}
                    <td>{feeStructure.schoolFees}</td>
                    {/* migration charges */}
                    <td>{feeStructure.migrationCharges}</td>
                    {/* buttons */}
                    <td>
                      {/* edit */}
                      <button
                        className="btn text-primary"
                        onClick={() => handleEdit(feeStructure.feeStructureId)}
                      >
                        <PencilSquare />
                      </button>

                      {/* delete */}
                      <button
                        className="btn text-danger"
                        onClick={() =>
                          handleDelete(feeStructure.feeStructureId)
                        }
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

EditFeeStructure.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default EditFeeStructure;
