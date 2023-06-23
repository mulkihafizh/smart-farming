import "../assets/css/toast.css";

const Toast = (props) => {
  console.log(props);
  return (
    <>
      {props.toast && (
        <div
          className={`toast ${props.toast.isError ? "isError" : "isSuccess"}`}
        >
          {props.toast.isError ? (
            <i className="fa-solid toastIcon fa-circle-xmark"></i>
          ) : (
            <i className="fa-solid toastIcon fa-circle-check"></i>
          )}
          <span className="toast-message">{props.toast.message}</span>
        </div>
      )}
    </>
  );
};

export default Toast;
