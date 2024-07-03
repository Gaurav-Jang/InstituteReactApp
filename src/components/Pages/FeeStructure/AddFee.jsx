import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
// import ApplicationHealthApi from "../../ApiEndpoints/ApplicationHealthApi";
import { Link, useSearchParams } from "react-router-dom";
import { DatePicker } from "antd";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import useLoader from "../../CustomHooks/useLoader";
import Swal from "sweetalert2/dist/sweetalert2.js";
function AddFee() {
  const inputFields = {
    Type: "Shared User",
  };
  const inputFieldClass = "form-control";
  const [renderDatabaseDiv, setRenderDatabaseDiv] = useState("row mt-2 d-none");
  const [renderWebsiteDiv, setRenderWebsiteDiv] = useState("row mt-2 d-none");
  const [userNameValidationClass, setUserNameValidationClass] =
    useState(inputFieldClass);
  const [passwordValidationClass, setPasswordValidationClass] =
    useState(inputFieldClass);
  const [dbNameValidationClass, setdbNameValidationClass] =
    useState(inputFieldClass);
  const [urlValidationClass, seturlValidationClass] = useState(inputFieldClass);
  const [inputs, setInputs] = useState(inputFields);
  const [credentialMasterData, setCredentialMasterData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const [saveButtonClass, setSaveButtonClass] = useState(
    "btn btn-primary mt-3"
  );
  const [updateButtonClass, setUpdateButtonClass] = useState(
    "btn btn-primary mt-3 d-none"
  );
  const [enableDisableType, setEnableDisableType] = useState("");
  const [databaseRecords, setDatabaseRecords] = useState({});
  // const [loader, showLoader, hideLoader] = useLoader();

  useEffect(() => {
    getCredentialMasterData();
    if (searchParams.get("Id") != null) {
      getCredentialDataById(searchParams.get("Id"));
      setSaveButtonClass("btn btn-primary mt-3 d-none");
      setUpdateButtonClass("btn btn-primary mt-3");
      setEnableDisableType("disabled");
    }
  }, []);

  const handleChange = (event) => {
    // if (event.target.name == "UserName")
    //   setUserNameValidationClass(inputFieldClass);
    // else if (event.target.name == "Password")
    //   setPasswordValidationClass(inputFieldClass);
    // else if (event.target.name == "DBName")
    //   setdbNameValidationClass(inputFieldClass);
    // else if (event.target.name == "URL") seturlValidationClass(inputFieldClass);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  // const calculateExpiryDateByExpiryDays = (e) => {
  //   const val = e.target.value;
  //   if (val != null && val != "") {
  //     var result = new Date(startDate);
  //     result.setDate(result.getDate() + parseInt(val));
  //     setInputs((val) => ({ ...val, ExpiryDate: formatDate(result) }));
  //   } else {
  //     setInputs((val) => ({ ...val, ExpiryDate: "" }));
  //   }
  // };
  // const calculateExpiryDate = (date) => {
  //   if (inputs.ExpiryDays != null && inputs.ExpiryDays != "") {
  //     var result = new Date(date);
  //     result.setDate(result.getDate() + parseInt(inputs.ExpiryDays));
  //     setInputs((val) => ({ ...val, ExpiryDate: formatDate(result) }));
  //   } else {
  //     setInputs((val) => ({ ...val, ExpiryDate: "" }));
  //   }
  // };
  // function formatDate(date) {
  //   var d = new Date(date),
  //     month = "" + (d.getMonth() + 1),
  //     day = "" + d.getDate(),
  //     year = d.getFullYear();

  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;

  //   return [year, month, day].join("-");
  // }

  const handleFields = (event) => {
    setdbNameValidationClass(inputFieldClass);
    seturlValidationClass(inputFieldClass);
    setInputs(inputFields);
    handleChange(event);
    if (event.target.value == "Database") {
      setRenderDatabaseDiv("row mt-2");
      setRenderWebsiteDiv("row mt-2 d-none");
    } else if (event.target.value == "Websites") {
      setRenderWebsiteDiv("row mt-2");
      setRenderDatabaseDiv("row mt-2 d-none");
    } else {
      setRenderDatabaseDiv("row mt-2 d-none");
      setRenderWebsiteDiv("row mt-2 d-none");
    }
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div>
      <label className="mb-1">Last Set Date</label>
      <button
        type="button"
        className="form-control text-start"
        name="LastSetDate"
        onClick={() => {
          onClick();
        }}
        ref={ref}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "calc(100% - 250px)",
          marginLeft: "auto",
        }}
      >
        {value} <i className="bi bi-calendar3"></i>
      </button>
    </div>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    let apiGetData =
      ApplicationHealthApi.BaseURL +
      ApplicationHealthApi.HealthTracking.SetCredentialData;
    Object.assign(inputs, { LastSetDate: formatDate(startDate) });
    if (inputs.Id != undefined && inputs.Id != "") {
      if (JSON.stringify(inputs) === JSON.stringify(databaseRecords)) {
        Swal.fire({
          title: "Warning",
          text: "Please update some fields to proceed.",
          icon: "warning",
        });
        return false;
      } else {
        apiGetData =
          ApplicationHealthApi.BaseURL +
          ApplicationHealthApi.HealthTracking.UpdateCredentialData;
      }
    }

    if (inputs.UserName == "" || inputs.UserName == undefined) {
      setUserNameValidationClass("form-control border border-danger");
    } else if (inputs.Password == "" || inputs.Password == undefined) {
      setPasswordValidationClass("form-control border border-danger");
    } else if (
      inputs.Type == "Database" &&
      (inputs.DBName == "" || inputs.DBName == undefined)
    ) {
      setdbNameValidationClass("form-control border border-danger");
    } else if (
      inputs.Type == "Websites" &&
      (inputs.URL == "" || inputs.URL == undefined)
    ) {
      seturlValidationClass("form-control border border-danger");
    } else {
      // showLoader();
      axios
        .post(apiGetData, inputs)
        .then((response) => {
          Swal.fire({
            text: "Form submitted / updated successfully!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/credentials";
            }
          });
        })
        .catch(function (error) {
          console.log(error);
          // hideLoader();
        });
    }
  };

  const getCredentialDataById = (Id) => {
    // const apiGetData =
    //   // ApplicationHealthApi.BaseURL + ApplicationHealthApi.HealthTracking.GetCredentialDataById.replace( "{0}", Id );
    //   // showLoader();
    //   axios
    //     .get(apiGetData)
    //     .then((response) => {
    //       setInputs(response.data);
    //       setDatabaseRecords(response.data);
    //       if (response.data.Type == "Database") {
    //         setRenderDatabaseDiv("row mt-2");
    //         setRenderWebsiteDiv("row mt-2 d-none");
    //       } else if (response.data.Type == "Websites") {
    //         setRenderWebsiteDiv("row mt-2");
    //         setRenderDatabaseDiv("row mt-2 d-none");
    //       } else {
    //         setRenderDatabaseDiv("row mt-2 d-none");
    //         setRenderWebsiteDiv("row mt-2 d-none");
    //       }
    //       // hideLoader();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       // hideLoader();
    //     });
  };

  const getCredentialMasterData = () => {
    // const apiGetData =
    //   // ApplicationHealthApi.BaseURL +
    //   // ApplicationHealthApi.HealthTracking.GetCredentialMasterData;
    //   // showLoader();
    //   axios
    //     // .get(apiGetData)
    //     .then((response) => {
    //       setCredentialMasterData(response.data);
    //       // hideLoader();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       // hideLoader();
    //     });
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        method="post"
        style={{
          marginLeft: "auto",
          width: "calc(100% - 280px)",
          padding: "30px",
          paddingTop: "100px",
        }}
      >
        <div>
          <div className="row mt-3">
            <div className="col-6">
              <h3>Credentials</h3>
            </div>
            <div className="col-6 text-end">
              <i
                className="bi bi-arrow-left-square-fill dangerLinkColor"
                style={{ fontSize: "20px" }}
              ></i>
              &nbsp;
              <Link
                to="/credentials"
                className="dangerLinkColor"
                style={{ verticalAlign: "text-bottom" }}
              >
                Go back to Credential Grid
              </Link>
            </div>
          </div>

          <div className="row mt-2">
            <div className="form-group col-md-4">
              <label className="mb-1">Type</label>
              <select
                className="form-control"
                disabled={enableDisableType}
                value={inputs.Type || ""}
                name="Type"
                onChange={handleFields}
              >
                {credentialMasterData
                  .filter((dataset) => dataset.KeyId == 1)
                  .map((data) => {
                    return (
                      <option value={data.Type} data-id={data.Id}>
                        {data.Type}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Server Name</label>
              <input
                type="text"
                name="ServerName"
                className="form-control"
                value={inputs.ServerName || ""}
                onChange={handleChange}
                id="txtServerName"
                placeholder="Enter server name"
              />
            </div>
          </div>

          <div className={renderDatabaseDiv}>
            <div className="form-group col-md-4">
              <label className="mb-1">DB Type</label>
              <select
                className="form-control"
                name="DBType"
                value={inputs.DBType || ""}
                onChange={handleChange}
              >
                <option value="0" name="--Select--">
                  --Select--
                </option>
                {credentialMasterData
                  .filter((dataset) => dataset.KeyId === 3)
                  .map((data) => {
                    return (
                      <option value={data.Type} id={data.Id}>
                        {data.Type}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">DB Name</label>
              <input
                type="text"
                name="DBName"
                className={dbNameValidationClass}
                value={inputs.DBName || ""}
                onChange={handleChange}
                id="txtDBName"
                placeholder="Enter DB name"
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Environment</label>
              <select
                className="form-control"
                name="Environment"
                value={inputs.Environment || ""}
                onChange={handleChange}
              >
                <option value="0" name="--Select--">
                  --Select--
                </option>
                {credentialMasterData
                  .filter((dataset) => dataset.KeyId === 2)
                  .map((data) => {
                    return (
                      <option value={data.Type} id={data.Id}>
                        {data.Type}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div className={renderWebsiteDiv}>
            <div className="form-group col-md-4">
              <label className="mb-1">URL</label>
              <input
                type="text"
                name="URL"
                className={urlValidationClass}
                value={inputs.URL || ""}
                onChange={handleChange}
                id="txtURL"
                placeholder="Enter url"
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Point of Contact</label>
              <input
                type="text"
                name="PointOfContact"
                className="form-control"
                value={inputs.PointOfContact || ""}
                onChange={handleChange}
                id="txtPointOfContact"
                placeholder="Enter point of contact"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="form-group col-md-4">
              <label className="mb-1">User Name</label>
              <input
                type="text"
                name="UserName"
                className={userNameValidationClass}
                value={inputs.UserName || ""}
                onChange={handleChange}
                id="txtUserName"
                placeholder="Enter user name"
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Password New</label>
              <input
                type="password"
                name="Password"
                className={passwordValidationClass}
                value={inputs.Password || ""}
                onChange={handleChange}
                id="txtPassword"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Previous Password</label>
              <input
                type="password"
                name="PreviousPassword"
                className="form-control"
                value={inputs.PreviousPassword || ""}
                onChange={handleChange}
                id="txtPreviousPassword"
                placeholder="Enter previous password"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-3">
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  calculateExpiryDate(date);
                }}
                customInput={<ExampleCustomInput />}
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Expiry Days</label>
              <input
                type="number"
                name="ExpiryDays"
                className="form-control"
                value={inputs.ExpiryDays || ""}
                onChange={(e) => {
                  handleChange(e);
                  calculateExpiryDateByExpiryDays(e);
                }}
                id="txtExpiryDays"
                placeholder="Enter expiry days"
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Expiry Date</label>
              <input
                type="text"
                name="ExpiryDate"
                className="form-control"
                value={inputs.ExpiryDate || ""}
                disabled
                onChange={handleChange}
                id="txtExpiryDate"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-8">
              <label className="mb-1">Applications</label>
              <input
                type="text"
                name="Applications"
                className="form-control"
                value={inputs.Applications || ""}
                onChange={handleChange}
                id="txtApplications"
                placeholder="Enter applications"
              />
            </div>
            <div className="form-group col-md-4">
              <label className="mb-1">Remarks</label>
              <input
                type="text"
                name="Remarks"
                className="form-control"
                value={inputs.Remarks || ""}
                onChange={handleChange}
                id="txtRemarks"
                placeholder="Enter remarks"
              />
            </div>
          </div>
          <button type="submit" className={saveButtonClass}>
            Submit
          </button>
          <button type="submit" className={updateButtonClass}>
            Update
          </button>
        </div>
      </form>
      {/* {loader} */}
    </React.Fragment>
  );
}
export default AddFee;
