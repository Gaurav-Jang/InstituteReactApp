// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useLoader from "../../CustomHooks/useLoader";
// import ApplicationHealthApi from "../../ApiEndpoints/ApplicationHealthApi";
// import { Link } from "react-router-dom";
// import Accordion from "react-bootstrap/Accordion";
// import Swal from "sweetalert2/dist/sweetalert2.js";

// function Credentials() {
//   const [credentialData, setCredentialData] = useState(null);
//   //Loader
//   const [loader, showLoader, hideLoader] = useLoader();
//   useEffect(() => {
//     getCredentialData();
//   }, []);

//   const getCredentialData = () => {
//     const apiGetData =
//       ApplicationHealthApi.BaseURL +
//       ApplicationHealthApi.HealthTracking.GetCredentialData;
//     showLoader();
//     axios
//       .get(apiGetData)
//       .then((response) => {
//         setCredentialData(response.data);
//         hideLoader();
//       })
//       .catch(function (error) {
//         console.log(error);
//         hideLoader();
//       });
//   };
//   return (
//     <React.Fragment>
//       <div className="row mt-3">
//         <div className="col-6">
//           <h3>Credentials Grid</h3>
//         </div>
//         <div className="col-6 text-end">
//           <Link to="/addcredential">
//             <button className="btn btn-primary">Add Credential</button>
//           </Link>
//         </div>
//       </div>
//       <br />
//       <Accordion>
//         {credentialData === null
//           ? null
//           : credentialData.length > 0
//           ? credentialData.map((data, index) => {
//               return (
//                 <React.Fragment key={data.type}>
//                   <Accordion.Item eventKey={index}>
//                     <Accordion.Header>{data.type}</Accordion.Header>
//                     <Accordion.Body>
//                       <CredentialData
//                         data={data.items}
//                         type={data.type}
//                         getCredentialDataHandler={getCredentialData}
//                         showLoader={showLoader}
//                         hideLoader={hideLoader}
//                       ></CredentialData>
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 </React.Fragment>
//               );
//             })
//           : "No Records Found"}
//       </Accordion>
//       {loader}
//     </React.Fragment>
//   );
// }
// export default Credentials;

// export function CredentialData(props) {
//   const DeleteCredential = (Id) => {
//     const apiGetData =
//       ApplicationHealthApi.BaseURL +
//       ApplicationHealthApi.HealthTracking.DeleteCredential.replace("{0}", Id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         props.showLoader();
//         axios
//           .get(apiGetData)
//           .then((response) => {
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your credential has been deleted.",
//               icon: "success",
//             });
//             props.hideLoader();
//             props.getCredentialDataHandler();
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       }
//     });
//   };
//   return (
//     <React.Fragment>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             {props.type == "Database" ? <th>DB Name</th> : null}
//             <th>User Name</th>
//             <th>Password</th>
//             <th>Expiry Date</th>
//             {props.type == "Websites" ? (
//               <React.Fragment>
//                 <th>URL</th>
//                 <th>Point Of Contact</th>
//               </React.Fragment>
//             ) : null}
//             <th>Applications</th>
//             <th style={{ width: "80px", textAlign: "center" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {props.data == null ? null : props.data.length > 0 ? (
//             props.data.map((data) => {
//               let redirectionPath = "/addCredential?Id=" + data.Id;
//               return (
//                 <tr>
//                   {props.type == "Database" ? <td>{data.DBName}</td> : null}
//                   <td>{data.UserName}</td>
//                   <td>
//                     <ShowHidePassword
//                       name="password"
//                       password={data.Password}
//                     ></ShowHidePassword>
//                   </td>
//                   {data.isExpired ? (
//                     <td style={{ backgroundColor: "#f9484887" }}>
//                       {data.ExpiryDate}
//                     </td>
//                   ) : (
//                     <td>{data.ExpiryDate}</td>
//                   )}
//                   {props.type == "Websites" ? (
//                     <React.Fragment>
//                       <td>{data.URL}</td>
//                       <td>{data.PointOfContact}</td>
//                     </React.Fragment>
//                   ) : null}
//                   <td>{data.Applications}</td>
//                   <td className="text-center">
//                     <Link to={redirectionPath}>
//                       <i
//                         className="bi bi-pencil-square me-2"
//                         title="Edit"
//                         style={{ color: "green", cursor: "pointer" }}
//                       ></i>
//                     </Link>
//                     <i
//                       className="bi bi-trash"
//                       title="Delete"
//                       style={{ color: "red", cursor: "pointer" }}
//                       onClick={() => {
//                         DeleteCredential(data.Id);
//                       }}
//                     ></i>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr className="text-center">
//               <td colSpan="9">No records found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </React.Fragment>
//   );
// }
// export function ShowHidePassword({ name, password }) {
//   const [isVisible, setVisible] = useState(false);

//   const toggle = () => {
//     setVisible(!isVisible);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <input
//         type={!isVisible ? "password" : "text"}
//         name={name}
//         style={{ border: "none" }}
//         value={password}
//         readOnly
//       />
//       <span className="icon" onClick={toggle}>
//         {isVisible ? (
//           <i
//             className="bi bi-eye-slash-fill cursor-pointer"
//             style={{ color: "#0d6efd" }}
//           ></i>
//         ) : (
//           <i
//             className="bi bi-eye-fill cursor-pointer"
//             style={{ color: "#0d6efd" }}
//           ></i>
//         )}
//       </span>
//     </div>
//   );
// }

import React from "react";

const EditFee = () => {
  return <div>EditFee</div>;
};

export default EditFee;
