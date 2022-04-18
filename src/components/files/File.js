import "../../styles/files.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFilePdf,
  faFileWord,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

const File = ({ title, file }) => {
  // Later after clicking on file download will begin
  let icon;
  switch (file.split(".").pop()) {
    case "pdf":
      icon = faFilePdf;
      break;
    case "doc":
    case "docx":
      icon = faFileWord;
      break;
    case "xlsx":
    case "xls":
      icon = faFileExcel;
      break;
    default:
      icon = faFile;
      break;
  }

  return (
    <div className="file">
      <div className="file-wrapper">
        <FontAwesomeIcon className="file-icon" icon={icon} size="3x" />
        <div className="file-title">{title}</div>
      </div>
    </div>
  );
};

export default File;
