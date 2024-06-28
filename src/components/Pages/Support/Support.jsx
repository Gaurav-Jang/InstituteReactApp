import PropTypes from "prop-types"; // prop-types
import { useEffect, useState } from "react"; // hooks
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/Support.css"; // custom css file
import validator from "validator"; // email validator
// import backGround from "/background.webp";

const Support = ({ setProgress, sidebarToggle, setSidebarToggle }) => {
  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // initial data in form's input field
  const [data, setData] = useState({
    SupportId: "",
    FullName: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  // validation errors state
  const [errors, setErrors] = useState({});

  // custom hook for popups
  const { renderPopup, showPopup, hidePopup } = usePopup();

  // function to reset form data
  const resetForm = () => {
    setData({
      SupportId: "",
      FullName: "",
      Email: "",
      Subject: "",
      Message: "",
    });
    setErrors("error in resetting form data");
  };

  // support api
  const setSupportData = () => {
    const dataSet = {
      SupportId: data.SupportId,
      FullName: data.FullName,
      Email: data.Email,
      Subject: data.Subject,
      Message: data.Message,
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(InstituteSoft.BaseURL + InstituteSoft.Support.SetSupport, dataSet) // api's endpoint
      .then((response) => {
        console.log(response.data);
        showPopup("success", {
          title: "Form Submitted Successfully",
          confirmBtn: false,
          link: "/",
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
    // full name
    if (!data.FullName) newErrors.FullName = "Full Name is required";
    // email
    if (!data.Email) {
      newErrors.Email = "Email is required";
    } else if (!validator.isEmail(data.Email)) {
      newErrors.Email = "Invalid email address";
    }
    // subject
    if (!data.Subject) newErrors.Subject = "Subject is required";
    // message
    if (!data.Message) newErrors.Message = "Message is required";
    // check if there is any error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showPopup("error", {
        title: "Error!",
        text: "Please complete the form.",
      }); // shows error popup
    } else {
      setSupportData(); // submit the data
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#FBFBFE",
          paddingTop: "50px",
          width: "calc(100% - 250px)",
          backgroundImage: "url(/background-3.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main-container"
      >
        {/* main content */}
        <section className="add-container p-4">
          {/* head text */}
          <div>
            <h1 className="mb-2 text-4xl font-bold text-blue-600">Support</h1>
            <p className="text-lg">
              We are here to help you. Please fill out the form below and we
              will get back to you as soon as possible.
            </p>
          </div>

          {/* form */}
          <div className="mt-4 md:mx-10 xs:mx-0">
            <form className="needs-validation w-full space-y-4">
              {/* full name */}
              <div>
                <label className="form-label dark:text-white">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.FullName ? "is-invalid" : ""
                  }`}
                  name="FullName"
                  minLength={3}
                  maxLength={50}
                  value={data.FullName}
                  onChange={handleInputChange}
                  placeholder="Joe Doe"
                />
                {errors.FullName && (
                  <div className="invalid-feedback">{errors.FullName}</div>
                )}
              </div>

              {/* email */}
              <div>
                <label className="form-label dark:text-white">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                  name="Email"
                  value={data.Email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                />
                {errors.Email && (
                  <div className="invalid-feedback">{errors.Email}</div>
                )}
              </div>

              {/* subject */}
              <div>
                <label className="form-label dark:text-white">Subject</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.Subject ? "is-invalid" : ""
                  }`}
                  name="Subject"
                  minLength={1}
                  maxLength={100}
                  value={data.Subject}
                  onChange={handleInputChange}
                  placeholder="Enter your subject..."
                />
                {errors.Subject && (
                  <div className="invalid-feedback">{errors.Subject}</div>
                )}
              </div>

              {/* message */}
              <div>
                <label className="form-label dark:text-white">Message</label>
                <textarea
                  type="textarea"
                  className={`h-24 form-control resize-none ${
                    errors.Message ? "is-invalid" : ""
                  }`}
                  name="Message"
                  minLength={1}
                  maxLength={250}
                  value={data.Message}
                  onChange={handleInputChange}
                  placeholder="Enter your message..."
                />
                {/* <span className="text-slate-400 text-sm supportSpan">
                  max length 250
                </span> */}
                {errors.Message && (
                  <div className="invalid-feedback">{errors.Message}</div>
                )}
              </div>

              {/* submit button */}
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* popups */}
        {renderPopup()}
      </div>
    </>
  );
};

Support.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default Support;
