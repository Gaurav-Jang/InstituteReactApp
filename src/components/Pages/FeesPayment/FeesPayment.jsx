// react lib's & hooks
import React from "react";
import "../../css/FeesPayment.css"; // custom css file

const FeesPayment = () => {
  return (
    <>
      <div
        style={{
          marginLeft: "250px",
          backgroundColor: "#FBFBFE",
          height: "100%",
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
          <div>
            <input className="form-control" type="search" name="search" />
            <button className="btn btn-primary">Search</button>
          </div>

          <div className="feesPayment d-flex justify-content-between align-items-center">
            {/* left section */}
            <div className="left-section">
              {/* 1 */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">StudentName</label>
                  <span>:-</span>
                </div>
                <span className="data">Gaurav</span>
              </div>
              {/* 2 */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">Date of birth</label>
                  <span>:-</span>
                </div>
                <span className="data">02-02-2003</span>
              </div>
              {/* 3  */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">FatherName</label>
                  <span>:-</span>
                </div>
                <span className="data">Dinesh Kumar</span>
              </div>
              {/* 4 */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">ClassRoom Enrolled</label>
                  <span>:-</span>
                </div>
                <span className="data">CSE</span>
              </div>
              {/* 5 */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">Availing Hostel</label>
                  <span>:-</span>
                </div>
                <span className="data">No</span>
              </div>
              {/* 6 */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">Availing Transport</label>
                  <span>:-</span>
                </div>
                <span className="data">No</span>
              </div>
              {/* 7 */}
              <div className="left-strip">
                <div className="set-label">
                  <label className="form-label">Availing School</label>
                  <span>:-</span>
                </div>
                <span className="data">Yes</span>
              </div>
            </div>

            {/* right section */}
            <div className="right-section">
              {/* 1 */}
              <div className="input-strip">
                <label className="form-label">Course fees</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter course fees"
                />
              </div>
              <div className="input-strip">
                <label className="form-label">Transport fees</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter transport fees"
                />
              </div>
              <div className="input-strip">
                <label className="form-label">School fees</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter School fees"
                />
              </div>
              <div className="input-strip">
                <label className="form-label">Hostel fees</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter hostel fees"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeesPayment;
