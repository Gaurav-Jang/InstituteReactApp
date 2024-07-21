import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
// import ApplicationHealthApi from "../../ApiEndpoints/ApplicationHealthApi";
import { Link, useSearchParams } from "react-router-dom";
import { DatePicker } from "antd";
import Swal from "sweetalert2/dist/sweetalert2.js";
function AddFee() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

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
  };
}
export default AddFee;
