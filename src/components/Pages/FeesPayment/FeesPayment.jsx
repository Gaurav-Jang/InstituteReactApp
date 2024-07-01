// react lib's & hooks
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // prop-type
import axios from "axios"; // axios (get : post)
import { Search } from "react-bootstrap-icons"; // bootstrap icon
import "../../css/FeesPayment.css"; // custom css file
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api
import usePopup from "../../CustomHooks/usePopup"; // custom popup hook

const FeesPayment = ({ setProgress }) => {
  const [activeStudents, setActiveStudents] = useState([]); // student's data state
  const [searchQuery, setSearchQuery] = useState(""); // search
  const [filteredStudents, setFilteredStudents] = useState([]); // search filter
  const [selectedStudent, setSelectedStudent] = useState(null); // filtered search

  // student data fields
  const [data, setData] = useState({
    StudentId: "",
    StudentFirstName: "",
    Dob: "",
    FatherFirstName: "",
    StudentClassRoomName: "",
    AvailingHostel: "",
    AvailingTransport: "",
    AvailingSchool: "",
    CourseFee: "",
    TransportFee: "",
    SchoolFee: "",
    HostelFee: "",
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
        console.error("API Error:", error);
      });
  };

  // search selected student
  const handleSelectStudent = (student) => {
    setSearchQuery(student.studentFirstName); // update search query
    setSelectedStudent(student); // set selected student

    // student's data fields
    setData({
      StudentId: student.studentId,
      StudentFirstName: student.studentFirstName,
      Dob: student.dob,
      FatherFirstName: student.fatherFirstName,
      StudentClassRoomName: student.studentClassRoomName,
      AvailingHostel: student.availingHostel,
      AvailingTransport: student.availingTransport,
      AvailingSchool: student.availingSchool,
      CourseFee: "",
      TransportFee: "",
      SchoolFee: "",
      HostelFee: "",
    });

    setFilteredStudents([]); // Reset search field
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    hidePopup(); // hide popup's
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {}; // new var for displaying empty input boxes

    // course fee
    if (!data.CourseFee || data.CourseFee <= 0)
      newErrors.CourseFee = "Please enter a valid amount";
    // transport fee
    if (!data.TransportFee || data.TransportFee <= 0)
      newErrors.TransportFee = "Please enter a valid amount";
    // School fee
    if (!data.SchoolFee || data.SchoolFee <= 0)
      newErrors.SchoolFee = "Please enter a valid amount";
    // hostel fee
    if (!data.HostelFee || data.HostelFee <= 0)
      newErrors.HostelFee = "Please enter a valid amount";
    // sub total
    if (!data.SubTotal || data.SubTotal <= 0)
      newErrors.SubTotal = "Please enter a valid amount";
    // grand total
    if (!data.GrandTotal || data.GrandTotal <= 0)
      newErrors.GrandTotal = "Please enter a valid amount";
    // total amount
    if (!data.TotalAmount || data.TotalAmount <= 0)
      newErrors.TotalAmount = "Please enter a valid amount";
    // check if there is any error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showPopup("error", {
        title: "Error!",
        text: "Please complete the form.",
      }); // shows error popup
    } else {
      if (paramData === "Submit") {
        setStudentFeeData(); // submit fee data
      } else {
        updateStudentFee(); // update fee data
      }
    }
  };

  // handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (filteredStudents.length > 0) {
        setSearchQuery(filteredStudents[0].studentFirstName);
        setSelectedStudent(filteredStudents[0]);
        setFilteredStudents([]);
      }
    } else {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <div
      style={{
        marginLeft: "auto",
        backgroundColor: "#FBFBFE",
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
            onKeyUp={handleKeyPress}
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
                  value={data.StudentFirstName}
                  disabled
                />
              </div>

              {/* dob */}
              <div>
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={data.Dob}
                  disabled
                />
              </div>

              {/* father name */}
              <div>
                <label className="form-label">Father Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.FatherFirstName}
                  disabled
                />
              </div>

              {/* classroom name */}
              <div>
                <label className="form-label">ClassRoom Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.StudentClassRoomName}
                  disabled
                />
              </div>

              {/* availing hostel */}
              <div>
                <label className="form-label">Availing Hostel</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.AvailingHostel}
                  disabled
                />
              </div>

              {/* availing transport */}
              <div>
                <label className="form-label">Availing Transport</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.AvailingTransport}
                  disabled
                />
              </div>

              {/* availing school */}
              <div>
                <label className="form-label">Availing School</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.AvailingSchool}
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
              {/* course fee */}
              <div>
                <label className="form-label">Course Fee</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.CourseFee ? "is-invalid" : ""
                  }`}
                  name="CourseFee"
                  value={data.CourseFee}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* transport fee */}
              <div>
                <label className="form-label">Transport Fee</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.TransportFee ? "is-invalid" : ""
                  }`}
                  name="TransportFee"
                  value={data.TransportFee}
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
                <label className="form-label">School Fee</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.SchoolFee ? "is-invalid" : ""
                  }`}
                  name="SchoolFee"
                  value={data.SchoolFee}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                  onKeyDown={(e) =>
                    priceVal.includes(e.key) && e.preventDefault()
                  }
                  placeholder="0"
                />
              </div>

              {/* hostel fee */}
              <div>
                <label className="form-label">Hostel Fee</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.HostelFee ? "is-invalid" : ""
                  }`}
                  name="HostelFee"
                  value={data.HostelFee}
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
                value={data.SubTotal}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
              />
            </div>

            {/* grand total */}
            <div className="pay-amount my-3">
              <label className="form-label">Grand Total</label>
              <input
                type="number"
                className={`form-control ${
                  errors.GrandTotal ? "is-invalid" : ""
                }`}
                name="GrandTotal"
                value={data.GrandTotal}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
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
                value={data.TotalAmount}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
              />
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-4 mt-3">
              {/* payment button */}
              <div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Pay
                </button>
              </div>

              {/* receipt button */}
              <div>
                <button className="btn btn-primary" disabled>
                  Download Receipt
                </button>
              </div>
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
