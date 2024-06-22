import React, { useEffect, useState } from "react"; // hooks
import PropTypes from "prop-types"; // prop-types
import { FiUpload } from "react-icons/fi"; // react icons
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import { useSearchParams } from "react-router-dom";

const AddStudent = ({ setProgress }) => {
  const { showPopup, hidePopup, renderPopup } = usePopup();
  // validation errors state
  const [errors, setErrors] = useState({});
  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // initial data in form's input field
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

    axios
      .post(InstituteSoft.BaseURL + InstituteSoft.Student.SetStudent, dataSet)
      .then((response) => {
        console.log(response.data);
        showPopup("success");
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        showPopup("error");
      });
  };

  // insert photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      Photo: file,
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
    hidePopup(); // hide popups
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {}; // for display empty field
    // validation
    if (data.StudentFirstName === "")
      newErrors.StudentFirstName = "Student firstname requried";
    if (data.StudentLastName !== "")
      newErrors.StudentLastName = "Student lastname requried";
    if (data.Dob !== "") newErrors.Dob = "Enter your Dob";
    if (data.FatherFirstName !== "")
      newErrors.FatherFirstName = "Enter father name";
    if (data.FatherLastName !== "")
      newErrors.FatherFirstName = "Enter complete father name";
    if (data.FatherMobileNumber !== "")
      newErrors.FatherMobileNumber = "Enter father Mobile No.";
    if (data.StudentClassRoomName !== "")
      newErrors.StudentClassRoomName = "StudentClassRoomName requried";
    if (data.Address !== "") newErrors.Address = "Address requried";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showPopup("error", {
        title: "Error!",
        text: "Please complete the form.",
      }); // shows error popup
    } else {
      if (paramData === "Submit") {
        setStudentData();
      } else {
        console.log("update");
      }
    }
  };

  const [searchParam] = useSearchParams();
  const paramData = searchParam.get("StudentId") != null ? "Update" : "Submit";

  // number field validation
  const numVal = ["e", "E", "+", "-", "."];

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-between items-center p-4 gap-10 bg-slate-200 dark:bg-[#262450]">
        {/* Main Container */}
        <div className="space-y-10 xl:gap-10 xs:gap-0">
          {/* Header Text */}
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

          {/* Form */}
          <div className="md:mx-10 xs:mx-0">
            <form className="needs-validation w-full space-y-5">
              {/* Personal Details */}
              <h1 className="text-slate-900 font-semibold text-center xs:text-xl lg:text-2xl dark:text-white">
                Personal Details
              </h1>

              {/* Student Name */}
              <div>
                <label className="form-label">
                  Student Name <span className="text-red-500 text-base">*</span>
                </label>
                <div className="flex items-center gap-3 justify-center align-items-flex-start">
                  <div className="w-100">
                    {" "}
                    <input
                      type="text"
                      name="StudentFirstName"
                      className={`form-control 
                    ${errors.StudentFirstName ? "is-invalid" : ""}`}
                      minLength={3}
                      maxLength={50}
                      value={data.StudentFirstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                    />
                    {errors.StudentFirstName && (
                      <div className="invalid-feedback">
                        {errors.StudentFirstName}
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className={`form-control 
                    ${errors.StudentLastName ? "is-invalid" : ""}`}
                      name="StudentLastName"
                      minLength={3}
                      maxLength={50}
                      value={data.StudentLastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                    />
                    {errors.StudentLastName && (
                      <div className="invalid-feedback">
                        {errors.StudentLastName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Number */}
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

              {/* Gender */}
              <div>
                <label className="form-label">Gender</label>
                <select
                  name="Gender"
                  className="form-select cursor-pointer"
                  value={data.Gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Date of Birth (DOB) */}
              <div>
                <label className="form-label">
                  Date of Birth (DOB){" "}
                  <span className="text-red-500 text-base">*</span>
                </label>
                <input
                  type="date"
                  name="Dob"
                  className={`form-control 
                    ${errors.Dob ? "is-invalid" : ""}`}
                  value={data.Dob}
                  onChange={handleInputChange}
                />
                {errors.Dob && (
                  <div className="invalid-feedback">{errors.Dob}</div>
                )}
              </div>

              {/* Father Name */}
              <div>
                <label className="form-label">
                  Father Name <span className="text-base text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 justify-center align-items-flex-start">
                  <div className="w-100">
                    <input
                      type="text"
                      className={`form-control 
                    ${errors.FatherFirstName ? "is-invalid" : ""}`}
                      name="FatherFirstName"
                      minLength={3}
                      maxLength={50}
                      value={data.FatherFirstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                    />
                    {errors.FatherFirstName && (
                      <div className="invalid-feedback">
                        {errors.FatherFirstName}
                      </div>
                    )}
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className={`form-control 
                    ${errors.FatherLastName ? "is-invalid" : ""}`}
                      name="FatherLastName"
                      minLength={3}
                      maxLength={50}
                      value={data.FatherLastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                    />
                    {errors.FatherLastName && (
                      <div className="invalid-feedback">
                        {errors.FatherLastName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Father Mobile Number */}
              <div>
                <label className="form-label">
                  Father Mobile Number{" "}
                  <span className="text-base text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control 
                    ${errors.FatherMobileNumber ? "is-invalid" : ""}`}
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
                {errors.FatherMobileNumber && (
                  <div className="invalid-feedback">
                    {errors.FatherMobileNumber}
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <h1 className="text-slate-900 font-semibold text-center xs:text-xl lg:text-2xl dark:text-white">
                Additional Details:
              </h1>

              {/* Mother Name */}
              <div>
                <label className="form-label">Mother Name</label>
                <div className="flex items-center gap-4 justify-between">
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

              {/* Mother Mobile Number */}
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

              {/* Classroom Name */}
              <div>
                <label className="form-label">
                  Class Room Name{" "}
                  <span className="text-base text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control 
                    ${errors.StudentClassRoomName ? "is-invalid" : ""}`}
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
                {errors.StudentClassRoomName && (
                  <div className="invalid-feedback">
                    {errors.StudentClassRoomName}
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="form-label">
                  Address <span className="text-base text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control 
                    ${errors.Address ? "is-invalid" : ""}`}
                  name="Address"
                  minLength={3}
                  maxLength={50}
                  value={data.Address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
                {errors.Address && (
                  <div className="invalid-feedback">{errors.Address}</div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="form-label">Category</label>
                <select
                  name="Category"
                  className="form-select cursor-pointer"
                  value={data.Category}
                  onChange={handleInputChange}
                >
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                </select>
              </div>

              {/* Photo */}
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

              {/* Remarks */}
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

              {/* Additional Facility Details */}
              <h1 className="text-slate-900 font-semibold text-center xs:text-xl lg:text-2xl dark:text-white">
                Additional Facility Details:
              </h1>
              <div className="flex justify-between">
                <div>
                  {/* Transport */}
                  <div className="form-check">
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

                  {/* School */}
                  <div className="form-check">
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
                  {/* Hostel */}
                  <div className="form-check">
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

                  {/* Migrated */}
                  <div className="form-check">
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

              {/* Submit Button */}
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

      {renderPopup()}
    </>
  );
};

AddStudent.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default AddStudent;
