import React from "react";
import "../../css/AddFeesStructure.css";

function AddFeesStructure() {
  return (
    <>
      <div className="feesStructure">
        <div className="container">
          <div className="fs-form">
            <div className="fs-header">Fees Structure</div>
            <div className="fs-input">
              {/* ClassRoom dropdown  */}
              <div>
                <label class="form-label ">ClassRoom</label>
                <select name="Class" class="form-select cursor-pointer ">
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
                  className="form-control"
                  placeholder="Registration Fees"
                />
              </div>
              {/* Admission Fees  */}
              <div>
                <label class="form-label ">Admission Fees</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Admission Fees"
                />
              </div>
              {/* Tution Fees  */}
              <div>
                <label class="form-label ">Tution Fees</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tution Fees"
                />
              </div>
              {/* Welcome kit */}
              <div>
                <label class="form-label ">Welcome Kit</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Welcome Kit"
                />
              </div>
              {/* School Fees  */}
              <div>
                <label class="form-label ">School Fees</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="School Fees"
                />
              </div>
              {/* Migration Charges  */}
              <div>
                <label class="form-label ">Migration Charges</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Migration Charges"
                />
              </div>
            </div>
            <div className="text-right">
              <button className="btn btn-primary mt-3 ">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFeesStructure;
