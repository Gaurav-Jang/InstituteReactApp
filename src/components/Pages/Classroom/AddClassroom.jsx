import PropTypes from "prop-types"; // prop type
import { useEffect, useState } from "react"; // react hooks
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../CSS/AddClassroom.css";

const AddClassroom = ({
  setProgress,
  setPagename,
  sidebarToggle,
  setSidebarToggle,
}) => {
  // navbar + top loading bar
  useEffect(() => {
    setPagename("Add ClassRoom");
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setPagename, setProgress]);

  // api's hook
  useEffect(() => {
    getActiveClass();
    getActiveClassRoomType();
  }, []);

  // dropdowns
  const [activeClass, setActiveClass] = useState([]);
  const [activeClassRoomType, setActiveClassRoomType] = useState([]);

  // initial data in form's input field
  const [data, setData] = useState({
    ClassRoomId: "",
    ClassRoomName: "",
    Class: "8th",
    ClassRoomType: "Online",
    Price: "",
  });

  // custom hook for popups
  const { renderPopup, showPopup, hidePopup } = usePopup();

  // class api (dropdown)
  const getActiveClass = () => {
    axios
      .get(InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClass)
      .then((response) => {
        setActiveClass(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // classroom type api (dropdown)
  const getActiveClassRoomType = () => {
    axios
      .get(
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoomType // api's endpoint
      )
      .then((response) => {
        setActiveClassRoomType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // classroom api
  const setClassRoomData = () => {
    const dataSet = {
      ClassRoomId: data.ClassRoomId,
      ClassRoomName: data.ClassRoomName,
      Class: data.Class,
      ClassRoomType: data.ClassRoomType,
      Price: parseFloat(data.Price),
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.SetClassRoom,
        dataSet
      ) // api's endpoint
      .then((response) => {
        console.log(response.data);
        showPopup("success", { message: "Classroom added successfully!" });
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
        showPopup("error", { message: "Failed to add Classroom." });
      });
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    hidePopup();
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.ClassRoomName !== "" &&
      data.Class !== "" &&
      data.ClassRoomType !== "" &&
      data.Price < 0 &&
      data.Price !== ""
    ) {
      showPopup("error", { message: "Price cannot be negative or empty." });
    } else {
      setClassRoomData();
    }
  };

  // price field validation
  const priceVal = ["e", "E", "+", "-", "."];

  return (
    <div
      style={{
        marginLeft: "250px",
        paddingTop: "50px",
        backgroundColor: "#FBFBFE",
        height: "100%",
      }}
    >
      {/* main content */}
      <section className="add-container container p-4">
        {/* page head */}
        <div className="space-y-2 xs:ml-0">
          <p className="text-slate-500 text-lg">Say hello</p>
          <h1 className="dark:text-white text-3xl font-bold">
            Let's Work <span className="text-sky-500">Together</span>.
          </h1>
          <p className="dark:text-white text-lg font-medium">
            I'd love to meet up with you to discuss your venture, and potential
            collaborations.
          </p>
        </div>

        {/* form */}
        <div className="md:mx-10 xs:mx-0">
          <form className="needs-validation w-full space-y-5">
            {/* classroom name */}
            <div>
              <label className="form-label dark:text-white">
                ClassRoom Name
              </label>
              <input
                type="text"
                className="form-control"
                name="ClassRoomName"
                minLength={3}
                maxLength={50}
                value={data.ClassRoomName}
                onChange={handleInputChange}
                placeholder="ClassRoom Name"
              />
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                ClassRoom Name should be between 3-50
              </span>
            </div>

            {/* class */}
            <div>
              <label className="form-label dark:text-white">Class</label>

              {/* select class */}
              <select
                name="Class"
                className="form-select cursor-pointer"
                value={data.Class}
                onChange={handleInputChange}
              >
                {/* class options */}
                {activeClass.map((Class) => (
                  <option value={Class.className} key={Class.classId}>
                    {Class.className}
                  </option>
                ))}
              </select>
            </div>

            {/* classroom type */}
            <div>
              <label className="form-label dark:text-white">
                ClassRoom Type
              </label>

              {/* select class type */}
              <select
                className="form-select cursor-pointer"
                name="ClassRoomType"
                value={data.ClassRoomType}
                onChange={handleInputChange}
              >
                {/* class type options */}
                {activeClassRoomType.map((Class) => (
                  <option
                    value={Class.classRoomTypeName}
                    key={Class.classRoomTypeId}
                  >
                    {Class.classRoomTypeName}
                  </option>
                ))}
              </select>
            </div>

            {/* price */}
            <div>
              <label className="form-label dark:text-white">Price</label>
              <input
                type="number"
                className="form-control"
                name="Price"
                value={data.Price}
                onChange={handleInputChange}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                onKeyDown={(e) =>
                  priceVal.includes(e.key) && e.preventDefault()
                }
                placeholder="0"
              />
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
      </section>

      {/* popups */}
      {renderPopup()}
    </div>
  );
};

AddClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
  setPagename: PropTypes.func.isRequired,
};

export default AddClassroom;
