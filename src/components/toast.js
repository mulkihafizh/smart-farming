import React from "react";
import "../assets/css/toast.css";

const Toast = ({ message, isError }) => {
  return (
    <div className={`toast ${isError ? "isError" : "isSuccess"}`}>
      {isError ? (
        <i className="fa-solid toastIcon fa-circle-xmark"></i>
      ) : (
        <i className="fa-solid toastIcon fa-circle-check"></i>
      )}
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
