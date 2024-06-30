// react lib's & hooks
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types"; // prop-types
import { FiUpload } from "react-icons/fi"; // react icons
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook

const AddStudent = ({ setProgress }) => {
  const { showPopup, hidePopup, renderPopup } = usePopup(); // popup's custom hook

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
    // student
    StudentId: "",
    StudentFirstName: "",
    StudentLastName: "",
    MobileNumber: "",
    Gender: "",
    Dob: "",

    // father
    FatherFirstName: "",
    FatherLastName: "",
    FatherMobileNumber: "",

    // mother
    MotherFirstName: "",
    MotherLastName: "",
    MotherMobileNumber: "",

    // extras
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

  // function to reset form data
  const resetForm = () => {
    setData({
      // student
      StudentId: "",
      StudentFirstName: "",
      StudentLastName: "",
      MobileNumber: "",
      Gender: "",
      Dob: "",

      // father
      FatherFirstName: "",
      FatherLastName: "",
      FatherMobileNumber: "",

      // mother
      MotherFirstName: "",
      MotherLastName: "",
      MotherMobileNumber: "",

      // extras
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
    setErrors("error in resetting form data");
  };

  // student api
  const setStudentData = () => {
    // form data
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
      .post(InstituteSoft.BaseURL + InstituteSoft.Student.SetStudent, dataSet) // api's endpoint
      .then((response) => {
        if (response.data === "Class room already exists.") {
          // compares api's return message with your message
          showPopup("error", {
            title: "Duplicate Student",
            text: "The Student already exists. Please try again.",
          }); // duplicate error popup
        } else {
          showPopup("success", {
            title: "Student Added Successfully",
            confirmBtn: true,
            link: "/EditStudent",
            linkText: "Edit Student",
          }); // success popup
          resetForm(); // reset form after submission
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
        showPopup("error", {
          title: "Error!",
          text: "Please add some data in the form.",
        }); // show error popup
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
    let newErrors = {}; // new var for displaying empty input boxes

    // student first name
    if (data.StudentFirstName === "")
      newErrors.StudentFirstName = "Student FirstName is Required";
    // student last name
    if (data.StudentLastName === "")
      newErrors.StudentLastName = "Student LastName is Required";
    // dob
    if (data.Dob === "") newErrors.Dob = "Dob is Required";
    // father first name
    if (data.FatherFirstName === "")
      newErrors.FatherFirstName = "Father's FirstName is Required";
    // father last name
    if (data.FatherLastName === "")
      newErrors.FatherLastName = "Father's LastName is Required";
    // father mobile number
    if (data.FatherMobileNumber === "")
      newErrors.FatherMobileNumber = "Father's Mobile Number is Required";
    // student class room
    if (data.StudentClassRoomName === "")
      newErrors.StudentClassRoomName = "Student's ClassRoom Name is Required";
    // address
    if (data.Address === "") newErrors.Address = "Address is required";
    // check if there is any error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showPopup("error", {
        title: "Error!",
        text: "Please complete the form.",
      }); // shows error popup
    } else {
      if (paramData === "Submit") {
        setStudentData(); // submit the data
      } else {
        updateStudent(); // update the data
      }
    }
  };

  // search param
  const [searchParam] = useSearchParams();
  const paramData = searchParam.get("StudentId") != null ? "Update" : "Submit";

  // edit hook
  useEffect(() => {
    if (searchParam.get("StudentId") != null) getStudentByStudentId();
  }, [searchParam]);

  // edit data
  const getStudentByStudentId = () => {
    const studentId = searchParam.get("StudentId");
    const apiEditData =
      InstituteSoft.BaseURL +
      InstituteSoft.Student.GetStudentByStudentId.replace("{0}", studentId); // api's endpoint
    axios
      .get(apiEditData)
      .then((response) => {
        // Ensure no field is undefined or null
        setData((prevData) => ({
          ...prevData,
          StudentId: response.data.studentId || "",
          StudentFirstName: response.data.studentFirstName || "",
          StudentLastName: response.data.studentLastName || "",
          MobileNumber: response.data.mobileNumber || "",
          Gender: response.data.gender || "",
          Dob: response.data.dob || "",
          FatherFirstName: response.data.fatherFirstName || "",
          FatherLastName: response.data.fatherLastName || "",
          FatherMobileNumber: response.data.fatherMobileNumber || "",
          MotherFirstName: response.data.motherFirstName || "",
          MotherLastName: response.data.motherLastName || "",
          MotherMobileNumber: response.data.motherMobileNumber || "",
          StudentClassRoomName: response.data.studentClassRoomName || "",
          Address: response.data.address || "",
          Category: response.data.category || "",
          Remarks: response.data.remarks || "",
          Photo: response.data.photo || "",
          AvailingTransport: response.data.availingTransport || false,
          AvailingSchool: response.data.availingSchool || false,
          AvailingHostel: response.data.availingHostel || false,
          Migrated: response.data.migrated || false,
        }));
      })
      .catch((error) => {
        hidePopup(); // hide all popups
        showPopup("error", {
          title: "Error!",
          text: "You didn't edit anything in the form.",
        }); // show error popup
      });
  };

  // update student
  const updateStudent = () => {
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
      .post(
        InstituteSoft.BaseURL + InstituteSoft.Student.UpdateStudent,
        dataSet
      ) // api's endpoint
      .then((response) => {
        // compares api's return message with your message
        if (response.data === "Student already exists, make some changes.") {
          console.log("duplicate data");
          showPopup("error", {
            title: "Duplicate Student",
            text: "The student already exists. Please try a different name.",
          }); // duplicate error popup
        } else {
          showPopup("success", {
            title: "Student Updated Successfully",
            confirmBtn: true,
            link: "/EditStudent",
            linkText: "Edit Student",
          });
          resetForm(); // resets form data
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
        showPopup("error", {
          title: "Error!",
          text: "You didn't edit anything in the form.",
        }); // show error popup
      });
  };

  // number field validation
  const numVal = ["e", "E", "+", "-", "."];

  return (
    <>
      <div
        style={{
          marginLeft: "auto",
          backgroundColor: "#FBFBFE",
          paddingTop: "80px",
          paddingBottom: "80px",
          width: "calc(100% - 250px)",
          backgroundImage: "url(/backGround.webp)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Main Container */}
        <div className="add-container p-4">
          {/* Header Text */}
          <div className="space-y-2 xs:ml-0">
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
          <div className="mt-4 md:mx-10 xs:mx-0">
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
                <div className="flex  gap-3 justify-center align-items-flex-start">
                  {/* first name */}
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

                  {/* last name */}
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
                <div className="flex  gap-3 justify-center align-items-flex-start">
                  {/* first name */}
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

                  {/* last name */}
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

              {/* mother's name */}
              <div>
                <label className="form-label">Mother Name</label>
                <div className="flex  gap-3 justify-center align-items-flex-start">
                  {/* first name */}
                  <div className="w-100">
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
                  </div>

                  {/* last name */}
                  <div className="w-100">
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
                <label className="form-label">Photo</label>
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

              {/* check boxes */}
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
                  {paramData}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* popups */}
        {renderPopup()}
      </div>
    </>
  );
};

AddStudent.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default AddStudent;
