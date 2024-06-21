import React, { useState } from "react"; // hook
import ErrorPopup from "../validation/ErrorPopup"; // error popup
import SuccessPopup from "../validation/SuccessPopup"; // success popup
import DeletePopup from "../validation/DeletePopup"; // delete popup
import DeleteConfirmPopup from "../validation/DeleteConfirmPopup"; // delete confirm popup

const usePopup = () => {
  const [popupType, setPopupType] = useState(null); // type
  const [popupProps, setPopupProps] = useState({}); // properties

  // show popup of a specified type with optional properties
  const showPopup = (type, props = {}) => {
    setPopupType(type);
    setPopupProps(props);
  };

  // hide popup
  const hidePopup = () => {
    setPopupType(null);
    setPopupProps({});
  };

  // reset popup
  const resetPopup = () => {
    setPopupType(null);
    setPopupProps({});
  };

  // render popup according to current "type"
  const renderPopup = () => {
    switch (popupType) {
      case "error":
        return <ErrorPopup {...popupProps} onPopupClosed={hidePopup} />; // Pass error onPopupClosed callback
      case "success":
        return <SuccessPopup {...popupProps} onPopupClosed={hidePopup} />; // Pass success onPopupClosed callback
      case "delete":
        return <DeletePopup {...popupProps} onPopupClosed={hidePopup} />; // Pass delete onPopupClosed callback
      case "deleteConfirm":
        return <DeleteConfirmPopup {...popupProps} onPopupClosed={hidePopup} />; // Pass deleteConfirm onPopupClosed callback
      default:
        return null; // Render nothing if no popup type is set
    }
  };

  // return popups
  return {
    renderPopup,
    showPopup,
    hidePopup,
    resetPopup,
  };
};

export default usePopup;
