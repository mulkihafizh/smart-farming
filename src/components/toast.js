import React from "react";
import "../assets/css/toast.css";

const Toast = (toast) => {
  return (
    <div className={`toast ${toast.toast.isError ? "isError" : "isSuccess"}`}>
      {toast.toast.isError ? (
        <i className="fa-solid toastIcon fa-circle-xmark"></i>
      ) : (
        <i className="fa-solid toastIcon fa-circle-check"></i>
      )}
      <span className="toast-message">{toast.toast.message}</span>
    </div>
  );
};

export default Toast;
