// react lib's & hooks
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Search } from "react-bootstrap-icons";
import "../../css/FeesPayment.css";
import InstituteSoft from "../../ApiEndPoints/InstituteSoft";
import usePopup from "../../CustomHooks/usePopup";
import { useSearchParams } from "react-router-dom";

const FeesPayment = ({ setProgress }) => {
  const [activeStudents, setActiveStudents] = useState([]);
  const [activeFeeStructure, setActiveFeeStructure] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const { renderPopup, showPopup, hidePopup } = usePopup();
  const [searchParam] = useSearchParams();
  const paramData =
    searchParam.get("FeePaymentId") != null ? "Update" : "Submit";

  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => setProgress(100), 300);
    hidePopup();
  }, [setProgress]);

  // fetch data
  useEffect(() => {
    getActiveStudents();
    getActiveFeeStructure();
  }, []);

  // filter search results
  useEffect(() => {
    const results = activeStudents.filter((student) =>
      student.studentFirstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchQuery, activeStudents]);

  // fetch active students
  const getActiveStudents = () => {
    axios
      .get(`${InstituteSoft.BaseURL}${InstituteSoft.Student.GetActiveStudent}`)
      .then((response) => setActiveStudents(response.data))
      .catch((error) => console.error("API Error: ", error));
  };

  // fetch active fee structure
  const getActiveFeeStructure = async () => {
    try {
      const response = await axios.get(
        `${InstituteSoft.BaseURL}${InstituteSoft.FeeStructure.GetActiveFeeStructure}`
      );
      setActiveFeeStructure(response.data);
    } catch (error) {
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      });
    }
  };

  const getFeeStructureByClassRoom = async (classRoomName) => {
    try {
      const response = await axios.get(
        `${
          InstituteSoft.BaseURL
        }${InstituteSoft.FeeStructure.GetFeeStructureByClassRoom.replace(
          "{0}",
          classRoomName
        )}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching fee structure:", error);
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      });
    }
  };

  const setFeesPaymentData = () => {
    axios
      .post(
        `${InstituteSoft.BaseURL}${InstituteSoft.FeesPayment.SetFeesPayment}`,
        input
      )
      .then((response) => {
        if (response.data === "student fees payment already exists.") {
          console.log("Student Data", response.data);
          showPopup("error", {
            title: "Duplicate Fees Payment",
            text: "The Fees Payment already exists. Please try again.",
          });
        } else {
          showPopup("success", {
            title: "Fees Payment Added Successfully",
            confirmBtn: true,
            link: "/EditFeePayment",
            linkText: "Edit FeePayment",
          });
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        showPopup("error", {
          title: "Error!",
          text: "Please add some data in the form.",
        });
      });
  };

  const calculateSubTotal = (feeStructure) => {
    return [
      feeStructure.registrationFees,
      feeStructure.admissionFees,
      feeStructure.tuitionFees,
      feeStructure.welcomeKit,
      feeStructure.schoolFees,
      feeStructure.migrationCharges,
      feeStructure.examFees,
    ].reduce((total, fee) => total + Number(fee || 0), 0);
  };

  const calculateTotalAmount = (feeStructure) => {
    const subTotal = calculateSubTotal(feeStructure);
    const discount = 10000;
    return subTotal - discount;
  };

  const handleSelectStudent = async (student) => {
    try {
      const response = await getFeeStructureByClassRoom(
        student.studentClassRoomName
      );
      const feeStructure = response?.data[0] || {};

      setInput({
        StudentFirstName: student.studentFirstName || "",
        Dob: student.dob ? student.dob.split("T")[0] : "",
        FatherFirstName: student.fatherFirstName || "",
        StudentClassRoomName: student.studentClassRoomName || "",
        AvailingHostel: student.availingHostel,
        AvailingTransport: student.availingTransport,
        AvailingSchool: student.availingSchool,
        RegistrationFees: feeStructure.registrationFees || 0,
        AdmissionFees: feeStructure.admissionFees || 0,
        TuitionFees: feeStructure.tuitionFees || 0,
        WelcomeKit: feeStructure.welcomeKit || 0,
        SchoolFees: feeStructure.schoolFees || 0,
        MigrationCharges: feeStructure.migrationCharges || 0,
        ExamFees: feeStructure.examFees || 0,
        SubTotal: calculateSubTotal(feeStructure),
        Discount: 10000,
        TotalAmount: calculateTotalAmount(feeStructure),
      });

      console.log("Input state after setting:", {
        StudentFirstName: student.studentFirstName,
        Dob: student.dob,
        FatherFirstName: student.fatherFirstName,
        StudentClassRoomName: student.studentClassRoomName,
        AvailingHostel: student.availingHostel,
        AvailingTransport: student.availingTransport,
        AvailingSchool: student.availingSchool,
        RegistrationFees: feeStructure.registrationFees,
        AdmissionFees: feeStructure.admissionFees,
        TuitionFees: feeStructure.tuitionFees,
        WelcomeKit: feeStructure.welcomeKit,
        SchoolFees: feeStructure.schoolFees,
        MigrationCharges: feeStructure.migrationCharges,
        ExamFees: feeStructure.examFees,
        SubTotal: calculateSubTotal(feeStructure),
        Discount: 10000,
        TotalAmount: calculateTotalAmount(feeStructure),
      });
    } catch (error) {
      console.error("Error fetching fee structure:", error);
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => {
      const updatedInput = { ...prevInput, [name]: value };
      const subTotal = [
        updatedInput.RegistrationFees,
        updatedInput.AdmissionFees,
        updatedInput.TuitionFees,
        updatedInput.WelcomeKit,
        updatedInput.SchoolFees,
        updatedInput.MigrationCharges,
        updatedInput.ExamFees,
      ].reduce((total, fee) => total + Number(fee || 0), 0);
      const discount = 10000;
      const totalAmount = subTotal - discount;

      return {
        ...updatedInput,
        SubTotal: subTotal,
        Discount: discount,
        TotalAmount: totalAmount,
      };
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    hidePopup();
  };

  const handleSubmit = (e) => {
    console.log("Submit button is clicked!");
    e.preventDefault();
    let newErrors = {}; // new var for displaying empty input boxes

    // student data
    if (!input.StudentFirstName)
      newErrors.StudentFirstName = "Student Name is required";
    if (!input.Dob) newErrors.Dob = "Dob is required";
    if (!input.FatherFirstName)
      newErrors.FatherFirstName = "Father Name is required";
    if (!input.StudentClassRoomName)
      newErrors.StudentClassRoomName = "Student ClassRoom Name is required";
    // if (!input.AvailingHostel)
    //   newErrors.AvailingHostel = "Availing Hostel is required";
    // if (!input.AvailingTransport)
    //   newErrors.AvailingTransport = "Availing Transport is required";
    // if (!input.AvailingSchool)
    //   newErrors.AvailingSchool = "Availing School is required";

    // fee data
    if (!input.RegistrationFees || input.RegistrationFees <= 0)
      newErrors.RegistrationFees = "Please enter a valid amount";
    if (!input.AdmissionFees || input.AdmissionFees <= 0)
      newErrors.AdmissionFees = "Please enter a valid amount";
    if (!input.TuitionFees || input.TuitionFees <= 0)
      newErrors.TuitionFees = "Please enter a valid amount";
    if (!input.WelcomeKit || input.WelcomeKit <= 0)
      newErrors.WelcomeKit = "Please enter a valid amount";
    if (!input.SchoolFees || input.SchoolFees <= 0)
      newErrors.SchoolFees = "Please enter a valid amount";
    if (!input.MigrationCharges || input.MigrationCharges <= 0)
      newErrors.MigrationCharges = "Please enter a valid amount";
    if (!input.ExamFees || input.ExamFees <= 0)
      newErrors.ExamFees = "Please enter a valid amount";

    // billing amount
    if (!input.SubTotal || input.SubTotal <= 0)
      newErrors.SubTotal = "Please enter a valid amount";
    if (!input.Discount || input.Discount <= 0)
      newErrors.Discount = "Please enter a valid amount";
    if (!input.TotalAmount || input.TotalAmount <= 0)
      newErrors.TotalAmount = "Please enter a valid amount";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showPopup("error", {
        title: "Error!",
        text: "Please complete the form.",
      });
    } else {
      if (paramData === "Submit") {
        setFeesPaymentData(); // submit fee data
      } else {
        updateFeesPaymentData(); // update the data
      }
    }
  };

  const updateFeesPaymentData = () => {
    axios
      .post(
        `${InstituteSoft.BaseURL}${InstituteSoft.FeesPayment.UpdateFeesPayment}`,
        input
      )
      .then((response) => {
        if (
          response.data === "Fees payment already exists, make some changes."
        ) {
          showPopup("error", {
            title: "Duplicate fees payment",
            text: "The fees payment already exists. Please try something else.",
          });
        } else {
          showPopup("success", {
            title: "Fees Payment Updated Successfully",
            confirmBtn: true,
            link: "/EditFeePayment",
            linkText: "Edit FeePayment",
          });
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        showPopup("error", {
          title: "Error!",
          text: "You didn't edit anything in the form.",
        });
      });
  };

  const priceVal = ["-", "+", "e"]; // removing -, e, + from number input

  return (
    <div
      style={{
        marginLeft: "auto",
        backgroundColor: "#FBFBFE",
        padding: "80px 0px",
        width: "calc(100% - 250px)",
        backgroundImage: "url(/backGround.webp)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="main-container"
    >
      {/* main container */}
      <div className="container">
        {/* search */}
        <div className="search-container">
          <Search className="text-xl" />

          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by student name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {filteredStudents.length > 0 && (
            <ul className="autocomplete-results">
              {filteredStudents.map((student) => (
                <li
                  key={student.StudentId}
                  onClick={() => handleSelectStudent(student)}
                >
                  {student.studentFirstName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* data */}
        <div className="gap-10">
          {/* top */}
          <div className="w-full mb-3 left-section">
            {/* heading */}
            <div className="section-heading">
              Student Details
              <hr />
            </div>

            {/* student details */}
            <div className="student-details mt-3">
              {/* student name */}
              <div>
                <label className="form-label">Student First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.StudentFirstName ? "is-invalid" : ""
                  }`}
                  name="StudentFirstName"
                  value={input.StudentFirstName || ""}
                  disabled
                />
              </div>

              {/* dob */}
              <div>
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className={`form-control ${errors.Dob ? "is-invalid" : ""}`}
                  name="Dob"
                  value={input.Dob || ""}
                  disabled
                />
              </div>

              {/* father's name */}
              <div>
                <label className="form-label">Father's First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.FatherFirstName ? "is-invalid" : ""
                  }`}
                  name="FatherFirstName"
                  value={input.FatherFirstName || ""}
                  disabled
                />
              </div>

              {/* classroom name */}
              <div>
                <label className="form-label">Class Room Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.StudentClassRoomName ? "is-invalid" : ""
                  }`}
                  name="StudentClassRoomName"
                  value={input.StudentClassRoomName || ""}
                  disabled
                />
              </div>

              {/* availing hostel */}
              <div>
                <label className="form-label">Availing Hostel</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.AvailingHostel ? "is-invalid" : ""
                  }`}
                  name="AvailingHostel"
                  value={input.AvailingHostel}
                  disabled
                />
              </div>

              {/* availing transport */}
              <div>
                <label className="form-label">Availing Transport</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.AvailingTransport ? "is-invalid" : ""
                  }`}
                  name="AvailingTransport"
                  value={input.AvailingTransport}
                  disabled
                />
              </div>

              {/* availing school */}
              <div>
                <label className="form-label">Availing School</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.AvailingSchool ? "is-invalid" : ""
                  }`}
                  name="AvailingSchool"
                  value={input.AvailingSchool}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* mid */}
          <div className="w-full mb-3 flex flex-col justify-between right-section">
            {/* heading */}
            <div className="section-heading">
              Fees Details
              <hr />
            </div>

            {/* student fee */}
            <div className="fees-details mt-3">
              {/* registration fee */}
              <div>
                <label className="form-label">Registration Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.RegistrationFees ? "is-invalid" : ""
                  }`}
                  name="RegistrationFees"
                  value={input.RegistrationFees || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* admission fee */}
              <div>
                <label className="form-label">Admission Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.AdmissionFees ? "is-invalid" : ""
                  }`}
                  name="AdmissionFees"
                  value={input.AdmissionFees || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* tuition fee */}
              <div>
                <label className="form-label">Tuition Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.TuitionFees ? "is-invalid" : ""
                  }`}
                  name="TuitionFees"
                  value={input.TuitionFees || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* welcome kit */}
              <div>
                <label className="form-label">Welcome Kit</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.WelcomeKit ? "is-invalid" : ""
                  }`}
                  name="WelcomeKit"
                  value={input.WelcomeKit || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* school fee */}
              <div>
                <label className="form-label">School Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.SchoolFees ? "is-invalid" : ""
                  }`}
                  name="SchoolFees"
                  value={input.SchoolFees || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* migration fee */}
              <div>
                <label className="form-label">Migration Charges</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.MigrationCharges ? "is-invalid" : ""
                  }`}
                  name="MigrationCharges"
                  value={input.MigrationCharges || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* exam fee */}
              <div>
                <label className="form-label">Exam Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.ExamFees ? "is-invalid" : ""
                  }`}
                  name="ExamFees"
                  value={input.ExamFees || ""}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="right-section my-3">
            {/* sub total */}
            <div className="pay-amount">
              <label className="form-label">Sub Total</label>
              <input
                type="number"
                className={`form-control ${
                  errors.SubTotal ? "is-invalid" : ""
                }`}
                name="SubTotal"
                value={input.SubTotal || ""}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
                disabled
              />
            </div>

            {/* discount */}
            <div className="pay-amount my-3">
              <label className="form-label">Discount</label>
              <input
                type="number"
                className={`form-control ${
                  errors.Discount ? "is-invalid" : ""
                }`}
                name="Discount"
                value={input.Discount || ""}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
                disabled
              />
            </div>

            {/* total amount */}
            <div className="pay-amount">
              <label className="form-label">Total Amount</label>
              <input
                type="number"
                className={`form-control ${
                  errors.TotalAmount ? "is-invalid" : ""
                }`}
                name="TotalAmount"
                value={input.TotalAmount || ""}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
                disabled
              />
            </div>

            {/* button */}
            <div className="flex justify-end-mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {paramData === "Submit" ? "Submit" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* popups */}
      {renderPopup()}
    </div>
  );
};

FeesPayment.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default FeesPayment;
