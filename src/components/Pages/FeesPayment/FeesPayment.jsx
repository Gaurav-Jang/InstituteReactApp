// react lib's & hooks
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // prop-type
import axios from "axios"; // axios (get : post)
import { Search } from "react-bootstrap-icons"; // bootstrap icon
import "../../css/FeesPayment.css"; // custom css file
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api
import usePopup from "../../CustomHooks/usePopup"; // custom popup hook
import { useSearchParams } from "react-router-dom"; // search param

const FeesPayment = ({ setProgress }) => {
  const [activeStudents, setActiveStudents] = useState([]); // student's data state
  const [activeFeeStructure, setActiveFeeStructure] = useState([]); // fee structure data state
  const [searchQuery, setSearchQuery] = useState(""); // search
  const [filteredStudents, setFilteredStudents] = useState([]); // search filter
  const [selectedStudent, setSelectedStudent] = useState(null); // filtered search

  // student data fields
  const [studentData, setStudentData] = useState({
    StudentId: "",
    StudentFirstName: "",
    Dob: "",
    FatherFirstName: "",
    StudentClassRoomName: "",
    AvailingHostel: "",
    AvailingTransport: "",
    AvailingSchool: "",
  });

  // fees data fields
  const [feeData, setFeeData] = useState({
    RegistrationFees: "",
    AdmissionFees: "",
    TuitionFees: "",
    WelcomeKit: "",
    SchoolFees: "",
    MigrationCharges: "",
    ExamFees: "",
  });

  // billing amount fields
  const [amount, setAmount] = useState({
    SubTotal: "",
    Discount: "",
    TotalAmount: "",
  });

  // validation errors state
  const [errors, setErrors] = useState({});

  // custom hook for popups
  const { renderPopup, showPopup, hidePopup } = usePopup();

  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    hidePopup();
  }, [setProgress]);

  // api's hook
  useEffect(() => {
    getActiveStudents();
    getActiveFeeStructure();
  }, []);

  // search
  useEffect(() => {
    const results = activeStudents.filter(
      (student) =>
        student.studentFirstName &&
        student.studentFirstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchQuery, activeStudents]);

  // fetching student data
  const getActiveStudents = () => {
    axios
      .get(InstituteSoft.BaseURL + InstituteSoft.Student.GetActiveStudent) // api's endpoint
      .then((response) => {
        setActiveStudents(response.data);
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });
  };

  // fetching fee structure data
  const getActiveFeeStructure = async () => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL +
        InstituteSoft.FeeStructure.GetActiveFeeStructure; // api's endpoint
      const response = await axios.get(apiGetData);
      setActiveFeeStructure(response.data);
    } catch (error) {
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      }); // show error popup
    }
  };

  const getFeeStructureByClassRoom = async (classRoomName) => {
    try {
      const apiGetData =
        InstituteSoft.BaseURL +
        InstituteSoft.FeeStructure.GetFeeStructureByClassRoom.replace(
          "{0}",
          classRoomName
        );
      const response = await axios.get(apiGetData);
      return response;
    } catch (error) {
      console.error("Error fetching fee structure:", error);
      showPopup("error", {
        title: "Error!",
        text: "Server is down. Please try again later.",
      });
    }
  };

  // function to reset form data
  const resetForm = () => {
    setData({
      StudentId: "",
      StudentFirstName: "",
      Dob: "",
      FatherFirstName: "",
      StudentClassRoomName: "",
      AvailingHostel: "",
      AvailingTransport: "",
      AvailingSchool: "",
      RegistrationFees: "",
      AdmissionFees: "",
      TuitionFees: "",
      WelcomeKit: "",
      SchoolFees: "",
      MigrationCharges: "",
      ExamFees: "",
      SubTotal: "",
      Discount: "",
      TotalAmount: "",
    });
    setErrors("error in resetting form data");
  };

  // fees payment api
  const setFeesPaymentData = () => {
    const dataSet = {
      FeesPaymentId: data.FeesPaymentId,
      StudentFirstName: data.StudentFirstName,
      Dob: data.Dob,
      FatherFirstName: data.FatherFirstName,
      StudentClassRoomName: data.StudentClassRoomName,
      AvailingHostel: data.AvailingHostel,
      AvailingTransport: data.AvailingTransport,
      AvailingSchool: data.AvailingSchool,
      RegistrationFees: data.RegistrationFees,
      AdmissionFees: data.AdmissionFees,
      WelcomeKit: data.WelcomeKit,
      TuitionFees: data.TuitionFees,
      SchoolFees: data.SchoolFees,
      MigrationCharges: data.MigrationCharges,
      ExamFees: data.ExamFees,
      SubTotal: data.SubTotal,
      Discount: data.Discount,
      TotalAmount: data.TotalAmount,
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.FeesPayment.SetFeesPayment,
        dataSet
      ) // api's endpoint
      .then((response) => {
        if (response.data === "fees payment already exists.") {
          // compares api's return message with your message
          showPopup("error", {
            title: "Duplicate Fees Payment",
            text: "The Fees Payment already exists. Please try again.",
          }); // duplicate error popup
        } else {
          showPopup("success", {
            title: "Fees Payment Added Successfully",
            confirmBtn: true,
            link: "/EditFeePayment",
            linkText: "Edit FeePayment",
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

  // format date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // search selected student
  const handleSelectStudent = async (student) => {
    setSearchQuery(student.studentFirstName);
    setSelectedStudent(student);

    // Fetch the fee structure data for the selected student's classroom
    const response = await getFeeStructureByClassRoom(
      student.studentClassRoomName
    );

    if (response && response.data && response.data.length > 0) {
      const feeStructureData = response.data[0]; // Assuming the response is an array with a single object

      const feeStructure = {
        RegistrationFees: feeStructureData.registrationFees || "",
        AdmissionFees: feeStructureData.admissionFees || "",
        TuitionFees: feeStructureData.tuitionFees || "",
        WelcomeKit: feeStructureData.welcomeKit || "",
        SchoolFees: feeStructureData.schoolFees || "",
        MigrationCharges: feeStructureData.migrationCharges || "",
        ExamFees: feeStructureData.examFees || "",
      };

      // student's data fields
      setStudentData({
        StudentId: student.studentId,
        StudentFirstName: student.studentFirstName,
        Dob: formatDate(student.dob),
        FatherFirstName: student.fatherFirstName,
        StudentClassRoomName: student.studentClassRoomName,
        AvailingHostel: student.availingHostel,
        AvailingTransport: student.availingTransport,
        AvailingSchool: student.availingSchool,
      });

      // fee structure data fields
      setFeeData(feeStructure);

      // billing amount
      const subTotal =
        Number(feeStructure.RegistrationFees) +
        Number(feeStructure.AdmissionFees) +
        Number(feeStructure.TuitionFees) +
        Number(feeStructure.WelcomeKit) +
        Number(feeStructure.SchoolFees) +
        Number(feeStructure.MigrationCharges) +
        Number(feeStructure.ExamFees);

      const discount = 10000;
      const totalAmount = subTotal - discount;

      setAmount({
        SubTotal: subTotal,
        Discount: discount,
        TotalAmount: totalAmount,
      });

      setFilteredStudents([]); // Reset search field
    } else {
      console.warn(
        "No fee structure data found for classroom:",
        student.studentClassRoomName
      );
    }
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update feeData state
    setFeeData((prevFeeData) => ({
      ...prevFeeData,
      [name]: value,
    }));

    // Recalculate amounts based on updated feeData
    const subTotal =
      Number(feeData.RegistrationFees || 0) +
      Number(feeData.AdmissionFees || 0) +
      Number(feeData.TuitionFees || 0) +
      Number(feeData.WelcomeKit || 0) +
      Number(feeData.SchoolFees || 0) +
      Number(feeData.MigrationCharges || 0) +
      Number(feeData.ExamFees || 0);

    const discount = 10000;
    const totalAmount = subTotal - discount;

    // Update amount state with the recalculated values
    setAmount({
      SubTotal: subTotal,
      Discount: discount,
      TotalAmount: totalAmount,
    });

    // Clear errors for the current input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    hidePopup(); // Hide popup
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {}; // new var for displaying empty input boxes

    // student data
    if (!studentData.StudentFirstName)
      newErrors.StudentFirstName = "Student Name is required";
    if (!studentData.Dob) newErrors.Dob = "Dob is required";
    if (!studentData.FatherFirstName)
      newErrors.FatherFirstName = "Father Name is required";
    if (!studentData.StudentClassRoomName)
      newErrors.StudentClassRoomName = "Student ClassRoom Name is required";
    if (!studentData.AvailingHostel)
      newErrors.AvailingHostel = "Availing Hostel is required";
    if (!studentData.AvailingTransport)
      newErrors.AvailingTransport = "Availing Transport is required";
    if (!studentData.AvailingSchool)
      newErrors.AvailingSchool = "Availing School is required";

    // fee data
    if (!feeData.RegistrationFees || feeData.RegistrationFees <= 0)
      newErrors.RegistrationFees = "Please enter a valid amount";
    if (!feeData.AdmissionFees || feeData.AdmissionFees <= 0)
      newErrors.AdmissionFees = "Please enter a valid amount";
    if (!feeData.TuitionFees || feeData.TuitionFees <= 0)
      newErrors.TuitionFees = "Please enter a valid amount";
    if (!feeData.WelcomeKit || feeData.WelcomeKit <= 0)
      newErrors.WelcomeKit = "Please enter a valid amount";
    if (!feeData.SchoolFees || feeData.SchoolFees <= 0)
      newErrors.SchoolFees = "Please enter a valid amount";
    if (!feeData.MigrationCharges || feeData.MigrationCharges <= 0)
      newErrors.MigrationCharges = "Please enter a valid amount";
    if (!feeData.ExamFees || feeData.ExamFees <= 0)
      newErrors.ExamFees = "Please enter a valid amount";

    // billing amount
    if (!amount.SubTotal || amount.SubTotal <= 0)
      newErrors.SubTotal = "Please enter a valid amount";
    if (!amount.Discount || amount.Discount <= 0)
      newErrors.Discount = "Please enter a valid amount";
    if (!amount.TotalAmount || amount.TotalAmount <= 0)
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

  // search param
  const [searchParam] = useSearchParams();
  const paramData =
    searchParam.get("FeePaymentId") != null ? "Update" : "Submit";

  // edit hook
  useEffect(() => {
    if (searchParam.get("StudentId") != null) getFeesPaymentByFeesPaymentId();
  }, [searchParam]);

  // update data
  const updateFeesPaymentData = () => {
    const dataSet = {
      FeesPaymentId: data.FeesPaymentId,
      StudentFirstName: data.StudentFirstName,
      Dob: data.Dob,
      FatherFirstName: data.FatherFirstName,
      StudentClassRoomName: data.StudentClassRoomName,
      AvailingHostel: data.AvailingHostel,
      AvailingTransport: data.AvailingTransport,
      AvailingSchool: data.AvailingSchool,
      RegistrationFees: data.RegistrationFees,
      AdmissionFees: data.AdmissionFees,
      WelcomeKit: data.WelcomeKit,
      TuitionFees: data.TuitionFees,
      SchoolFees: data.SchoolFees,
      MigrationCharges: data.MigrationCharges,
      ExamFees: data.ExamFees,
      SubTotal: data.SubTotal,
      Discount: data.Discount,
      TotalAmount: data.TotalAmount,
    };

    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.FeesPayment.UpdateFeesPayment,
        dataSet
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
          resetForm(); // Reset form only when this success popup is closed
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

  // price field validation
  const priceVal = ["e", "E", "+", "-", "."];

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
      <div className="container">
        {/* search box */}
        <div className="search-container">
          {/* search icon */}
          <Search className="text-xl" />

          {/* search box input field */}
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by Student Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* search filter */}
          {searchQuery && filteredStudents.length > 0 && (
            <ul className="autocomplete-results">
              {filteredStudents.map((student) => (
                <li
                  key={student.studentId}
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
            <div className="section-header">
              Student Details
              <hr />
            </div>

            {/* student details */}
            <div className="student-details mt-3">
              {/* student name */}
              <div>
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData.StudentFirstName}
                  disabled
                />
              </div>

              {/* dob */}
              <div>
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={studentData.Dob}
                  disabled
                />
              </div>

              {/* father name */}
              <div>
                <label className="form-label">Father Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData.FatherFirstName}
                  disabled
                />
              </div>

              {/* classroom name */}
              <div>
                <label className="form-label">ClassRoom Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData.StudentClassRoomName}
                  disabled
                />
              </div>

              {/* availing hostel */}
              <div>
                <label className="form-label">Availing Hostel</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData.AvailingHostel}
                  disabled
                />
              </div>

              {/* availing transport */}
              <div>
                <label className="form-label">Availing Transport</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData.AvailingTransport}
                  disabled
                />
              </div>

              {/* availing school */}
              <div>
                <label className="form-label">Availing School</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData.AvailingSchool}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* mid */}
          <div className="w-full mb-3 flex flex-col justify-between right-section">
            {/* heading */}
            <div className="section-header">
              Fees Details
              <hr />
            </div>

            {/* student fees */}
            <div className="fees-details mt-3">
              {/* registration fees */}
              <div>
                <label className="form-label ">Registration Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.RegistrationFees ? "is-invalid" : ""
                  }`}
                  name="RegistrationFees"
                  value={feeData.RegistrationFees}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.RegistrationFees && (
                  <div className="invalid-feedback">
                    {errors.RegistrationFees}
                  </div>
                )}
              </div>

              {/* admission fees */}
              <div>
                <label className="form-label ">Admission Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.AdmissionFees ? "is-invalid" : ""
                  }`}
                  name="AdmissionFees"
                  value={feeData.AdmissionFees}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.AdmissionFees && (
                  <div className="invalid-feedback">{errors.AdmissionFees}</div>
                )}
              </div>

              {/* tuition fees */}
              <div>
                <label className="form-label ">Tuition Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.TuitionFees ? "is-invalid" : ""
                  }`}
                  name="TuitionFees"
                  value={feeData.TuitionFees}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.TuitionFees && (
                  <div className="invalid-feedback">{errors.TuitionFees}</div>
                )}
              </div>

              {/* welcome kit */}
              <div>
                <label className="form-label ">Welcome Kit</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.WelcomeKit ? "is-invalid" : ""
                  }`}
                  name="WelcomeKit"
                  value={feeData.WelcomeKit}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.WelcomeKit && (
                  <div className="invalid-feedback">{errors.WelcomeKit}</div>
                )}
              </div>

              {/* school fees */}
              <div>
                <label className="form-label ">School Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.SchoolFees ? "is-invalid" : ""
                  }`}
                  name="SchoolFees"
                  value={feeData.SchoolFees}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.SchoolFees && (
                  <div className="invalid-feedback">{errors.SchoolFees}</div>
                )}
              </div>

              {/* migration charges  */}
              <div>
                <label className="form-label ">Migration Charges</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.MigrationCharges ? "is-invalid" : ""
                  }`}
                  name="MigrationCharges"
                  value={feeData.MigrationCharges}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.MigrationCharges && (
                  <div className="invalid-feedback">
                    {errors.MigrationCharges}
                  </div>
                )}
              </div>

              {/* exam fees */}
              <div>
                <label className="form-label ">Exam Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.ExamFees ? "is-invalid" : ""
                  }`}
                  name="ExamFees"
                  value={feeData.ExamFees}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
                {errors.ExamFees && (
                  <div className="invalid-feedback">{errors.ExamFees}</div>
                )}
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
                value={amount.SubTotal}
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
                value={amount.Discount}
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
                value={amount.TotalAmount}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
                disabled
              />
            </div>

            {/* buttons */}
            <div className="flex justify-end mt-3">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                {paramData}
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
