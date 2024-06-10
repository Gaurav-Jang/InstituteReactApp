import PropTypes from "prop-types"; // prop type
import { useEffect, useState } from "react"; // react hooks
import { FiUpload } from "react-icons/fi"; // react icons
// popups
import ErrorPopup from "../../validation/ErrorPopup"; // error popup
// import SuccessPopup from "../../validation/SuccessPopup"; // success popup
import AddConfirmPopup from "../../validation/AddConfirmPopup"; // add confirm popup
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)

const AddStudent = ({ setPagename, setProgress }) => {
  // navbar + top loading bar
  useEffect(() => {
    setPagename("Add Student");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  const [data, setData] = useState({
    StudentId: "",
    StudentFirstName: "",
    StudentLastName: "",
    MobileNumber: "",
    Gender: "",
    Dob: "",
    FatherFirstName: "",
    FatherLastName: "",
    FatherMobileNumber: "",
    MotherFirstName: "",
    MotherLastName: "",
    MotherMobileNumber: "",
    StudentClassRoomName: "",
    Address: "",
    Category: "",
    Remarks: "",
    Photo: "",
    AvailingTransport: false,
    AvailingSchool: false,
    AvailingHostel: false,
    Migrated: false,
  });

  // initially hidden
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  // const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAddConfirmPopup, setShowAddConfirmPopup] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);

  // student api
  const setStudentData = () => {
    const dataSet = {
      StudentId: data.StudentId,
      StudentFirstName: data.StudentFirstName,
      StudentLastName: data.StudentLastName,
      MobileNumber: data.MobileNumber,
      Gender: data.Gender,
      Dob: data.Dob,
      FatherFirstName: data.FatherFirstName,
      FatherLastName: data.FatherLastName,
      FatherMobileNumber: data.FatherMobileNumber,
      MotherFirstName: data.MotherFirstName,
      MotherLastName: data.MotherLastName,
      MotherMobileNumber: data.MotherMobileNumber,
      StudentClassRoomName: data.StudentClassRoomName,
      Address: data.Address,
      Category: data.Category,
      Remarks: data.Remarks,
      Photo: data.Photo,
      AvailingTransport: data.AvailingTransport,
      AvailingSchool: data.AvailingSchool,
      AvailingHostel: data.AvailingHostel,
      Migrated: data.Migrated,
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(InstituteSoft.BaseURL + InstituteSoft.Student.SetStudent, dataSet) // api's endpoint
      .then((response) => {
        console.log(response.data);
        // setShowSuccessPopup(true);
        setShowAddConfirmPopup(true);
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
      });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      Photo: file, // Corrected here
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setShowErrorPopup(false);
    // setShowSuccessPopup(false);
    setShowAddConfirmPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.StudentFirstName != "" &&
      data.StudentLastName != "" &&
      data.Dob != "" &&
      data.FatherFirstName != "" &&
      data.FatherLastName != "" &&
      data.FatherMobileNumber != "" &&
      data.StudentClassRoomName != "" &&
      data.Address != ""
      // data.Remarks != ""
      // data.Photo != ""
    ) {
      setStudentData();
    } else {
      debugger;
      setShowErrorPopup(true);
    }
  };

  // price field validation
  const numVal = ["e", "E", "+", "-", "."];

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-between items-center p-4 gap-10 bg-slate-200 dark:bg-[#262450]">
        {/* main container */}
        <div className="space-y-10 xl:gap-10 xs:gap-0">
          {/* header text */}
          <div className="space-y-4 md:ml-10 xs:ml-0">
            <p className="text-slate-500 text-lg">Say hello</p>
            <h1 className="dark:text-white text-6xl font-bold">
              Let's Work <span className="text-sky-500">Together</span>.
            </h1>
            <p className="dark:text-white text-lg font-medium">
              I'd love to meet up with you to discuss your venture, and
              potential collaborations.
            </p>
          </div>

          {/* form */}
          <div className="md:mx-10 xs:mx-0">
            <form className="needs-validation w-full space-y-5">
              {/* personal details */}
              <h1 className="text-slate-900 font-semibold text-center xs:text-xl lg:text-2xl dark:text-white">
                Personal Details
              </h1>

              {/* student name */}
              <div>
                {/* heading */}
                <label className="form-label">
                  Student Name <span className="text-red-500 text-base">*</span>
                </label>

                {/* student details */}
                <div className="flex items-center gap-4 justify-between">
                  {/* first name */}
                  <input
                    type="text"
                    className="form-control"
                    name="StudentFirstName"
                    minLength={3}
                    maxLength={50}
                    value={data.StudentFirstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                  />

                  {/* last name */}
                  <input
                    type="text"
                    className="form-control"
                    name="StudentLastName"
                    minLength={3}
                    maxLength={50}
                    value={data.StudentLastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* mobile number */}
              <div>
                <label className="form-label">Mobile Number</label>

                <input
                  type="number"
                  className="form-control"
                  name="MobileNumber"
                  value={data.MobileNumber}
                  onChange={handleInputChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                  onKeyDown={(e) =>
                    numVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="Mobile number"
                />
              </div>

              {/* gender */}
              <div>
                <label className="form-label">Gender</label>

                {/* select gender */}
                <select
                  name="Gender"
                  className="form-select cursor-pointer"
                  value={data.Gender}
                  onChange={handleInputChange}
                >
                  {/* gender options */}
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* date of birth (dob) */}
              <div>
                <label className="form-label">
                  Date of Birth (DOB){" "}
                  <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  type="date"
                  name="Dob"
                  className="form-control"
                  value={data.Dob}
                  onChange={handleInputChange}
                />
              </div>

              {/* father name */}
              <div>
                <label className="form-label">
                  Father Name <span className="text-base text-red-500">*</span>
                </label>

                {/* father details */}
                <div className="flex items-center gap-4 justify-between">
                  {/* first name */}
                  <input
                    type="text"
                    className="form-control"
                    name="FatherFirstName"
                    minLength={3}
                    maxLength={50}
                    value={data.FatherFirstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                  />

                  {/* last name */}
                  <input
                    type="text"
                    className="form-control"
                    name="FatherLastName"
                    minLength={3}
                    maxLength={50}
                    value={data.FatherLastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* father mobile number */}
              <div>
                <label className="form-label">
                  Father Mobile Number{" "}
                  <span className="text-base text-red-500">*</span>
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="FatherMobileNumber"
                  value={data.FatherMobileNumber}
                  onChange={handleInputChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                  onKeyDown={(e) =>
                    numVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="Mobile number"
                />
              </div>

              {/* additional details */}
              <h1 className="text-slate-900 font-semibold text-center xs:text-xl lg:text-2xl dark:text-white">
                Additional Details:
              </h1>

              {/* mother name */}
              <div>
                <label className="form-label">Mother Name</label>

                {/* mother details */}
                <div className="flex items-center gap-4 justify-between">
                  {/* first name */}
                  <input
                    type="text"
                    className="form-control"
                    name="MotherFirstName"
                    minLength={3}
                    maxLength={50}
                    value={data.MotherFirstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />

                  {/* last name */}
                  <input
                    type="text"
                    className="form-control"
                    name="MotherLastName"
                    minLength={3}
                    maxLength={50}
                    value={data.MotherLastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* mother mobile number */}
              <div>
                <label className="form-label">Mother Mobile Number</label>

                <input
                  type="number"
                  className="form-control"
                  name="MotherMobileNumber"
                  value={data.MotherMobileNumber}
                  onChange={handleInputChange}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 10))
                  }
                  onKeyDown={(e) =>
                    numVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="Mobile number"
                />
              </div>

              {/* classroom name */}
              <div>
                <label className="form-label">
                  Class Room Name{" "}
                  <span className="text-base text-red-500">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="StudentClassRoomName"
                  minLength={3}
                  maxLength={50}
                  value={data.StudentClassRoomName}
                  onChange={handleInputChange}
                  placeholder="ClassRoom name"
                />

                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  ClassRoom Name should be between 3-50
                </span>
              </div>

              {/* address */}
              <div>
                <label className="form-label">
                  Address <span className="text-base text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  minLength={3}
                  maxLength={50}
                  value={data.Address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>

              {/* category */}
              <div>
                <label className="form-label">Category</label>

                {/* select category */}
                <select
                  name="Category"
                  className="form-select cursor-pointer"
                  value={data.Category}
                  onChange={handleInputChange}
                >
                  {/* category options */}
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                </select>
              </div>

              {/* photo */}
              <div className="space-y-1">
                <label className="form-label">
                  Photo <span className="text-base text-red-500">*</span>
                </label>

                <div className="relative flex flex-col gap-2 items-center justify-center">
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg"
                    />
                  )}

                  <div>
                    <label
                      htmlFor="photoInput"
                      className="bg-slate-100 text-slate-900 py-4 px-6 rounded-lg text-lg flex items-center justify-center cursor-pointer transition duration-300 hover:bg-slate-300 gap-2"
                    >
                      {photoPreview ? "Change Photo" : "Upload Photo"}

                      <input
                        type="file"
                        name="Photo"
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className="hidden"
                        id="photoInput"
                      />

                      <FiUpload className="" />
                    </label>

                    <p className="text-xs text-center text-slate-700 dark:text-slate-300 mt-2">
                      Max file size: 2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* remarks */}
              <div>
                <label className="form-label"></label>

                <input
                  type="text"
                  className="form-control"
                  name="Remarks"
                  minLength={3}
                  maxLength={50}
                  value={data.Remarks}
                  onChange={handleInputChange}
                  placeholder="Remarks"
                />
              </div>

              {/* additional facility details */}
              <h1 className="text-slate-900 font-semibold text-center xs:text-xl lg:text-2xl dark:text-white">
                Additional Facility Details:
              </h1>
              <div className="flex justify-between">
                <div>
                  {/* transport */}
                  <div className="form-check form-switch">
                    {/* transport checkbox buttons */}
                    <label className="form-check-label">
                      Availing Transport
                    </label>
                    <input
                      className="form-check-input cursor-pointer"
                      id="flexSwitchCheckDefault"
                      type="checkbox"
                      name="AvailingTransport"
                      checked={data.AvailingTransport}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* school */}
                  <div className="form-check form-switch">
                    {/* school checkbox buttons */}
                    <label className="form-check-label">Availing School</label>
                    <input
                      className="form-check-input cursor-pointer"
                      id="flexSwitchCheckDefault"
                      type="checkbox"
                      name="AvailingSchool"
                      checked={data.AvailingSchool}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  {/* hostel */}
                  <div className="form-check form-switch">
                    {/* hostel checkbox buttons */}
                    <label className="form-check-label">Availing Hostel</label>
                    <input
                      className="form-check-input cursor-pointer"
                      id="flexSwitchCheckDefault"
                      type="checkbox"
                      name="AvailingHostel"
                      checked={data.AvailingHostel}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* migrated */}
                  <div className="form-check form-switch">
                    {/* migrated checkbox buttons */}
                    <label className="form-check-label">Migrated</label>
                    <input
                      className="form-check-input cursor-pointer"
                      id="flexSwitchCheckDefault"
                      type="checkbox"
                      name="Migrated"
                      checked={data.Migrated}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* submit button */}
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showErrorPopup && <ErrorPopup />}
      {showAddConfirmPopup && <AddConfirmPopup />}
    </>
  );
};

AddStudent.propTypes = {
  setPagename: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default AddStudent;
