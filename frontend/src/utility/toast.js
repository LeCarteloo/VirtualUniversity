import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modal.scss";

const successToast = (text) => {
  return toast.success(text ? text : "Success", {
    theme: "dark",
    className: "toast",
  });
};

const infoToast = (text) => {
  return toast.info(text ? text : "Info", {
    className: "toast",
    theme: "dark",
  });
};

const warnToast = (text) => {
  return toast.warning(text ? text : "Warn", {
    className: "toast",
    theme: "dark",
  });
};

const errorToast = (text) => {
  return toast.error(text ? text : "Error", {
    className: "toast",
    theme: "dark",
  });
};

export { successToast, infoToast, warnToast, errorToast };
