import PropTypes from "prop-types"; // prop type
import { useEffect, useState } from "react"; // hooks
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/AddFeesStructure.css"; // custom css
import { useSearchParams } from "react-router-dom"; // search param

const AddFeeStructure = ({ setProgress }) => {
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
    getActiveClass();
  }, []);

  const [activeClass, setActiveClass] = useState([]); // class dropdown

  // initial data in form's input field
  const [data, setData] = useState({
    FeeStructureId: "",
    StudentClass: "8th",
    RegistrationFees: "",
    AdmissionFees: "",
    TuitionFees: "",
    WelcomeKit: "",
    SchoolFees: "",
    MigrationCharges: "",
  });

  // validation errors state
  const [errors, setErrors] = useState({});

  // custom hook for popups
  const { renderPopup, showPopup, hidePopup } = usePopup();

  // class api (dropdown)
  const getActiveClass = () => {
    axios
      .get(
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClass // api's endpoint
      )
      .then((response) => {
        setActiveClass(response.data); // displays class dropdown
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function to reset form data
  const resetForm = () => {
    setData({
      FeeStructureId: "",
      Class: "8th",
      RegistrationFees: "",
      AdmissionFees: "",
      TuitionFees: "",
      WelcomeKit: "",
      SchoolFees: "",
      MigrationCharges: "",
    });
    setErrors("error in resetting form data");
  };

  // fee structure api
  const setFeeStructureData = () => {
    const dataSet = {
      FeeStructureId: data.FeeStructureId,
      StudentClass: data.StudentClass,
      RegistrationFees: data.RegistrationFees,
      AdmissionFees: data.AdmissionFees,
      WelcomeKit: data.WelcomeKit,
      TuitionFees: data.TuitionFees,
      SchoolFees: data.SchoolFees,
      MigrationCharges: data.MigrationCharges,
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.FeeStructure.SetFeeStructure,
        dataSet
      ) // api's endpoint
      .then((response) => {
        if (response.data === "fee structure already exists.") {
          // compares api's return message with your message
          showPopup("error", {
            title: "Duplicate FeeStructure",
            text: "The FeeStructure already exists. Please try something else.",
          }); // duplicate error popup
        } else {
          showPopup("success", {
            title: "FeeStructure Added Successfully",
            confirmBtn: true,
            link: "/EditFeeStructure",
            linkText: "Edit FeeStructure",
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

  // input handler (onChange)
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {}; // new var for displaying empty input boxes

    // student class
    if (!data.StudentClass) newErrors.StudentClass = "Class is required";

    // registration fees
    if (!data.RegistrationFees || data.RegistrationFees <= 0)
      newErrors.RegistrationFees = "Registration Fees is required";

    // admission fees
    if (!data.AdmissionFees || data.AdmissionFees <= 0)
      newErrors.AdmissionFees = "Admission Fees is required";

    // tuition fees
    if (!data.TuitionFees || data.TuitionFees <= 0)
      newErrors.TuitionFees = "Tuition Fees is required";

    // welcome kit
    if (!data.WelcomeKit || data.WelcomeKit <= 0)
      newErrors.WelcomeKit = "Welcome Kit is required";

    // school fees
    if (!data.SchoolFees || data.SchoolFees <= 0)
      newErrors.SchoolFees = "School Fees is required";

    // migration charges
    if (!data.MigrationCharges || data.MigrationCharges <= 0)
      newErrors.MigrationCharges = "Migration Charges is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showPopup("error", {
        title: "Error!",
        text: "Please complete the form.",
      }); // shows error popup
    } else {
      if (paramData === "Submit") {
        setFeeStructureData(); // submit the data
      } else {
        updateFeeStructure(); // update the data
      }
    }
  };

  // search param
  const [searchParam] = useSearchParams();
  const paramData =
    searchParam.get("FeeStructureId") != null ? "Update" : "Submit";

  // edit hook
  useEffect(() => {
    if (searchParam.get("FeeStructureId") != null)
      getFeeStructureByFeeStructureId();
  }, [searchParam]);

  // edit data
  const getFeeStructureByFeeStructureId = () => {
    const feeStructureId = searchParam.get("FeeStructureId");
    const apiEditData =
      InstituteSoft.BaseURL +
      InstituteSoft.FeeStructure.GetFeeStructureByFeeStructureId.replace(
        "{0}",
        feeStructureId
      ); // api's endpoint
    axios
      .get(apiEditData)
      .then((response) => {
        // Ensure no field is undefined or null
        setData((prevData) => ({
          ...prevData,
          FeeStructureId: response.data.feeStructureId || "",
          StudentClass: response.data.studentClass || "8th",
          RegistrationFees: response.data.registrationFees || "",
          AdmissionFees: response.data.admissionFees || "",
          TuitionFees: response.data.tuitionFees || "",
          WelcomeKit: response.data.welcomeKit || "",
          SchoolFees: response.data.schoolFees || "",
          MigrationCharges: response.data.migrationCharges || "",
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

  // update data
  const updateFeeStructure = () => {
    const dataSet = {
      FeeStructureId: data.FeeStructureId,
      StudentClass: data.StudentClass,
      RegistrationFees: data.RegistrationFees,
      AdmissionFees: data.AdmissionFees,
      WelcomeKit: data.WelcomeKit,
      TuitionFees: data.TuitionFees,
      SchoolFees: data.SchoolFees,
      MigrationCharges: data.MigrationCharges,
    };

    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.FeeStructure.UpdateFeeStructure,
        dataSet
      ) // api's endpoint
      .then((response) => {
        // compares api's return message with your message
        if (
          response.data === "Fee Structure already exists, make some changes."
        ) {
          showPopup("error", {
            title: "Duplicate FeeStructure",
            text: "The FeeStructure already exists. Please try a different name.",
          }); // duplicate error popup
        } else {
          showPopup("success", {
            title: "FeeStructure Updated Successfully",
            confirmBtn: true,
            link: "/EditFeeStructure",
            linkText: "Edit FeeStructure",
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

  // price field validation
  const priceVal = ["e", "E", "+", "-", "."];

  return (
    <>
      <div className="feesStructure">
        <div className="container">
          {/* main form container */}
          <form className="fs-form" method="post" onSubmit={handleSubmit}>
            {/* heading */}
            <div className="fs-header">Fees Structure</div>

            {/* form fields */}
            <div className="fs-input">
              {/* class */}
              <div>
                <label className="form-label dark:text-white">Class</label>

                {/* select class */}
                <select
                  name="StudentClass"
                  className={`form-select cursor-pointer ${
                    errors.StudentClass ? "is-invalid" : ""
                  }`}
                  value={data.StudentClass}
                  onChange={handleInputChange}
                >
                  {/* class options */}
                  {activeClass.map((Class) => (
                    <option value={Class.className} key={Class.classId}>
                      {Class.className}
                    </option>
                  ))}
                </select>
                {errors.StudentClass && (
                  <div className="invalid-feedback">{errors.StudentClass}</div>
                )}
              </div>

              {/* registration fees */}
              <div>
                <label className="form-label ">Registration Fees</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.RegistrationFees ? "is-invalid" : ""
                  }`}
                  name="RegistrationFees"
                  value={data.RegistrationFees || ""}
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
                  value={data.AdmissionFees || ""}
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
                  value={data.TuitionFees || ""}
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
                  value={data.WelcomeKit || ""}
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
                  value={data.SchoolFees || ""}
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
                  value={data.MigrationCharges || ""}
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

              {/* submit button */}
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  {paramData}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* popups */}
        {renderPopup()}
      </div>
    </>
  );
};

AddFeeStructure.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default AddFeeStructure;
