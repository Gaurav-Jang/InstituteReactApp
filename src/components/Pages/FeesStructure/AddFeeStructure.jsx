import React from "react";
import "../../css/AddFeesStructure.css";
// import Swal from "sweetalert2/dist/sweetalert2.js";
import { useState } from "react"; // hooks
import InstituteSoft from "../../ApiEndPoints/InstituteSoft"; // api's endpoint
import axios from "axios"; // axios (get : post)
import usePopup from "../../CustomHooks/usePopup"; // custom hook

function AddFeeStructure() {
  const [inputs, setInputs] = useState({
    Class: "8th", // Initial values for your form fields
    RegistrationFees: "",
    AdmissionFees: "",
    TutionFees: "",
    WelcomeKit: "",
    SchoolFees: "",
    MigrationCharges: "",
  });

  const [databaseRecords, setDatabaseRecords] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let apiGetData =
      InstituteSoft.BaseURL + InstituteSoft.FeeStructure.SetFeeStructure;
    Object.assign(inputs);
    axios
      .post(apiGetData, inputs)
      .then((response) => {
        showPopup("success", {
          title: "FeeStructure Added Successfully",
          confirmBtn: true,
        }); // success popup
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="feesStructure">
        <div className="container">
          <form onSubmit={handleSubmit} method="post" className="fs-form">
            <div className="fs-header">Fees Structure</div>
            <div className="fs-input">
              {/* ClassRoom dropdown  */}
              <div>
                <label class="form-label ">Class</label>
                <select
                  name="Class"
                  value={inputs.Class || "8th"}
                  onChange={handleChange}
                  class="form-select cursor-pointer "
                >
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                  <option value="Target">Target</option>
                </select>
              </div>
              {/* Registration Fees */}
              <div>
                <label class="form-label ">Registration Fees</label>
                <input
                  type="text"
                  value={inputs.RegistrationFees || ""}
                  name="RegistrationFees"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Registration Fees"
                />
              </div>
              {/* Admission Fees  */}
              <div>
                <label class="form-label ">Admission Fees</label>
                <input
                  type="text"
                  value={inputs.AdmissionFees || ""}
                  name="AdmissionFees"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Admission Fees"
                />
              </div>
              {/* Tution Fees  */}
              <div>
                <label class="form-label ">Tution Fees</label>
                <input
                  type="text"
                  value={inputs.TutionFees || ""}
                  name="TutionFees"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Tution Fees"
                />
              </div>
              {/* Welcome kit */}
              <div>
                <label class="form-label ">Welcome Kit</label>
                <input
                  type="text"
                  value={inputs.WelcomeKit || ""}
                  name="WelcomeKit"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Welcome Kit"
                />
              </div>
              {/* School Fees  */}
              <div>
                <label class="form-label ">School Fees</label>
                <input
                  type="text"
                  value={inputs.SchoolFees || ""}
                  name="SchoolFees"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="School Fees"
                />
              </div>
              {/* Migration Charges  */}
              <div>
                <label class="form-label ">Migration Charges</label>
                <input
                  type="text"
                  value={inputs.MigrationCharges || ""}
                  name="MigrationCharges"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Migration Charges"
                />
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary mt-3 ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddFeeStructure;
