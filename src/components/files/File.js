import "../../styles/files.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const File = ({ icon, title, file }) => {
  // Later after clicking on file download will begin
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
