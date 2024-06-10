import React, { useState } from "react";
// popup validations
import ErrorPopup from "../validation/ErrorPopup";
import SuccessPopup from "../validation/SuccessPopup";
import DeletePopup from "../validation/DeletePopup";
import DeleteConfirmPopup from "../validation/DeleteConfirmPopup";

const usePopup = () => {
  const [popupType, setPopupType] = useState(null);
  const [popupProps, setPopupProps] = useState({});

  const showPopup = (type, props = {}) => {
    setPopupType(type);
    setPopupProps(props);
  };

  const hidePopup = () => {
    setPopupType(null);
    setPopupProps({});
  };

  const renderPopup = () => {
    switch (popupType) {
      case "error":
        return <ErrorPopup {...popupProps} />;
      case "success":
        return <SuccessPopup {...popupProps} />;
      case "delete":
        return <DeletePopup {...popupProps} />;
      case "deleteConfirm":
        return <DeleteConfirmPopup {...popupProps} />;
      default:
        return null;
    }
  };

  return {
    renderPopup,
    showPopup,
    hidePopup,
  };
};

export default usePopup;
