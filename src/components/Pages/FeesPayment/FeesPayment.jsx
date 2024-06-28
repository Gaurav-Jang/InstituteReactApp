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
          backgroundImage: "url(/background-3.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="main-container"
      >
        <div className="container">
          {/* search box */}
          <div className="text-center">Search</div>

          {/* data fields */}
          <div className="flex mt-10">
            {/* left */}
            <div className="w-100">
              <div className="col-md-6 space-y-5">
                {/* student name */}
                <div className="form-group">
                  <label htmlFor="name">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Student Name"
                  />
                </div>

                {/* father's name */}
                <div className="form-group">
                  <label htmlFor="name">Father Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Father Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>
              </div>
            </div>

            {/* right */}
            <div className="w-100">
              <div className="col-md-6 space-y-5">
                {/* student name */}
                <div className="form-group">
                  <label htmlFor="name">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Student Name"
                  />
                </div>

                {/* father's name */}
                <div className="form-group">
                  <label htmlFor="name">Father Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Father Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeesPayment;
