import PropTypes from "prop-types"; // prop type
import { useEffect, useState } from "react"; // react hooks
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook
import "../../css/AddClassroom.css";
import { useSearchParams } from "react-router-dom";

const AddClassroom = ({ setProgress, sidebarToggle, setSidebarToggle }) => {
  // top loading bar
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 300);
  }, [setProgress]);

  // api's hook
  useEffect(() => {
    getActiveClass();
    getActiveClassRoomType();
  }, []);

  // dropdowns
  const [activeClass, setActiveClass] = useState([]); // class dropdown
  const [activeClassRoomType, setActiveClassRoomType] = useState([]); // classroom type dropdown

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

  // classroom type api (dropdown)
  const getActiveClassRoomType = () => {
    axios
      .get(
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.GetActiveClassRoomType // api's endpoint
      )
      .then((response) => {
        setActiveClassRoomType(response.data); // displays classroom type dropdown
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
      Price: data.Price,
    };

    // sending data to APIs endpoint using POST method
    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.SetClassRoom,
        dataSet
      ) // api's endpoint
      .then((response) => {
        console.log(response.data);
        showPopup("success", {
          title: "Classroom Added Successfully",
          link: "/EditClassRoom",
        });
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
        showPopup("error");
      });
  };

  // input handler (onChange)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    hidePopup(); // hide popups
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.ClassRoomName !== "" &&
      data.Class !== "" &&
      data.ClassRoomType !== "" &&
      data.Price > 0 &&
      data.Price !== ""
    ) {
      if (paramData === "Submit") {
        setClassRoomData(); // reload classroom page
      } else {
        console.log("update it");
        updateClassRoom();
      }
    } else {
      showPopup("error"); // error popup
    }
  };

  // search param
  const [searchParam] = useSearchParams();
  const paramData =
    searchParam.get("ClassRoomId") != null ? "Update" : "Submit";

  // edit hook
  useEffect(() => {
    console.log(searchParam.get("ClassRoomId"));
    if (searchParam.get("ClassRoomId") != null) getClassRoomByClassRoomId();
  }, [searchParam.get("ClassRoomId")]);

  // edit data
  const getClassRoomByClassRoomId = () => {
    const classRoomId = searchParam.get("ClassRoomId");
    const apiEditData =
      InstituteSoft.BaseURL +
      InstituteSoft.ClassRoom.GetClassRoomByClassRoomId.replace(
        "{0}",
        classRoomId
      ); // Use captured ID directly
    axios
      .get(apiEditData)
      .then((response) => {
        console.log(response.data); // Refresh the table data after deletion
        // Ensure no field is undefined or null
        setData((prevData) => ({
          ...prevData,
          ClassRoomId: response.data.classRoomId || "",
          ClassRoomName: response.data.classRoomName || "",
          Class: response.data.class || "8th",
          ClassRoomType: response.data.classRoomType || "Online",
          Price: response.data.price || "",
        }));
      })
      .catch((error) => {
        hidePopup();
        showPopup("error");
      });
  };

  // update data
  const updateClassRoom = () => {
    const dataSet = {
      ClassRoomId: data.ClassRoomId,
      ClassRoomName: data.ClassRoomName,
      Class: data.Class,
      ClassRoomType: data.ClassRoomType,
      Price: data.Price,
    };

    axios
      .post(
        InstituteSoft.BaseURL + InstituteSoft.ClassRoom.UpdateClassRoom,
        dataSet
      ) // api's endpoint
      .then((response) => {
        console.log(response.data);
        showPopup("success", {
          title: "Classroom Updated Successfully",
          link: "/EditClassRoom",
        });
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message); // prints error message or error data came from api
        showPopup("error");
      });
  };

  // price field validation
  const priceVal = ["e", "E", "+", "-", "."];

  return (
    <>
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
              I'd love to meet up with you to discuss your venture, and
              potential collaborations.
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

              {/* submit & update button */}
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                {paramData}
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

AddClassroom.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default AddClassroom;
