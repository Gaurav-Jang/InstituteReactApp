// react lib's & hooks
import PropTypes from "prop-types"; // prop type
import { useEffect, useState } from "react"; // hooks
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import { Search } from "react-bootstrap-icons"; // react-bootstraps icon
import "../../css/FeesPayment.css"; // custom css file
// import { useSearchParams } from "react-router-dom"; // search param

const FeesPayment = ({ setProgress, sidebarToggle, setSidebarToggle }) => {
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
    getActiveStudent();
  }, []);

  const [activeStudent, setActiveStudent] = useState([]); // student data

  // initial data in form's input field
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

  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // custom hook for popups
  const { renderPopup, showPopup, hidePopup } = usePopup();

  // student api (AddStudent form data)
  const getActiveStudent = () => {
    axios
      .get(
        InstituteSoft.BaseURL + InstituteSoft.Student.GetActiveStudent // api's endpoint
      )
      .then((response) => {
        setActiveStudent(response.data); // displays student data
      })
      .catch((error) => {
        console.log(error);
      });
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
      CourseFee: "",
      TransportFee: "",
      SchoolFee: "",
      HostelFee: "",
    });
    setErrors("error in resetting form data");
  };

  // student api
  const setStudentFeeData = () => {
    const dataSet = {
      StudentId: data.StudentId,
      CourseFee: data.CourseFee,
      TransportFee: data.TransportFee,
      SchoolFee: data.SchoolFee,
      HostelFee: data.HostelFee,
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(InstituteSoft.BaseURL + InstituteSoft.Student.SetStudent, dataSet) // api's endpoint
      .then((response) => {
        showPopup("success", {
          title: "Price submitted Successfully. Please make payment now.",
          confirmBtn: true,
          link: "/",
          linkText: "This way",
        }); // success popup
        resetForm(); // reset form after submission
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
        showPopup("error", {
          title: "Error!",
          text: "Please add some data in the form.",
        }); // show error popup
      });
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
    hidePopup(); // hide popups
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

  // Update search term state
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // fees field validation
  const feeVal = ["e", "E", "+", "-", "."];

  return (
    <>
      <div
        style={{
          marginLeft: "250px",
          backgroundColor: "#FBFBFE",
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
            {/* search icon */}
            <Search className="text-2xl" />

            {/* search box */}
            <input
              type="text"
              className="form-control search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by Student Name"
            />
          </div>

          {/* student data */}
          <div className="flex justify-between gap-10">
            {/* left section */}
            <div className="w-full">
              <div key={""} className="space-y-4">
                <div>
                  {/* Student Name */}
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    // name={`StudentFirstName-${""}`}
                    // value={""}
                    placeholder="Student Name"
                    disabled
                  />
                </div>

                {/* Dob, FatherFirstName, StudentClassRoomName, AvailingHostel, AvailingTransport, AvailingSchool */}

                {/* dob */}
                <div>
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={data.Dob}
                    placeholder="yyyy/mm/dd"
                    disabled
                  />
                </div>

                {/* father name */}
                <div>
                  <label className="form-label">Father Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="FatherFirstName"
                    value={data.FatherFirstName}
                    placeholder="Father Name"
                    disabled
                  />
                </div>

                {/* classroom name */}
                <div>
                  <label className="form-label">ClassRoom Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="StudentClassRoomName"
                    value={data.StudentClassRoomName}
                    placeholder="ClassRoom Name"
                    disabled
                  />
                </div>

                {/* availing hostel */}
                <div>
                  <label className="form-label">Availing Hostel</label>
                  <input
                    type="text"
                    className="form-control"
                    name="AvailingHostel"
                    value={data.AvailingHostel}
                    placeholder="Availing Hostel"
                    disabled
                  />
                </div>

                {/* availing transport */}
                <div>
                  <label className="form-label">Availing Transport</label>
                  <input
                    type="text"
                    className="form-control"
                    name="AvailingTransport"
                    value={data.AvailingTransport}
                    placeholder="Availing Transport"
                    disabled
                  />
                </div>

                {/* availing school */}
                <div>
                  <label className="form-label">Availing School</label>
                  <input
                    type="text"
                    className="form-control"
                    name="AvailingSchool"
                    value={data.AvailingSchool}
                    placeholder="Availing School"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="w-full flex flex-col justify-between">
              {/* fees */}
              <div className="space-y-4">
                {/* course fees */}
                <div>
                  <label className="form-label">Course Fees</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.CourseFee ? "is-invalid" : ""
                    }`}
                    name="CourseFee"
                    value={data.CourseFee}
                    onChange={handleInputChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 7))
                    }
                    onKeyDown={(e) =>
                      feeVal.includes(e.key) && e.preventDefault()
                    }
                    placeholder="Course Fees"
                  />
                </div>

                {/* transport fees */}
                <div>
                  <label className="form-label">Transport Fees</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.TransportFee ? "is-invalid" : ""
                    }`}
                    name="TransportFee"
                    value={data.TransportFee}
                    onChange={handleInputChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 7))
                    }
                    onKeyDown={(e) =>
                      feeVal.includes(e.key) && e.preventDefault()
                    }
                    placeholder="Transport Fees"
                  />
                </div>

                {/* school fees */}
                <div>
                  <label className="form-label">School Fees</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.SchoolFee ? "is-invalid" : ""
                    }`}
                    name="SchoolFee"
                    value={data.SchoolFee}
                    onChange={handleInputChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 7))
                    }
                    onKeyDown={(e) =>
                      feeVal.includes(e.key) && e.preventDefault()
                    }
                    placeholder="School Fees"
                  />
                </div>

                {/* hostel fees */}
                <div>
                  <label className="form-label">Hostel Fees</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.HostelFee ? "is-invalid" : ""
                    }`}
                    name="HostelFee"
                    value={data.HostelFee}
                    onChange={handleInputChange}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 7))
                    }
                    onKeyDown={(e) =>
                      feeVal.includes(e.key) && e.preventDefault()
                    }
                    placeholder="Hostel Fees"
                  />
                </div>
              </div>

              {/* buttons */}
              <div className="flex justify-end gap-4">
                {/* submit */}
                <div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Pay
                  </button>
                </div>

                {/* download receipt */}
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
    </>
  );
};

FeesPayment.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default FeesPayment;
