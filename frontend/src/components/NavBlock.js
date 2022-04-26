import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const NavBlock = () => {
  return (
    <div className="nav-block">
      <FontAwesomeIcon icon={faFolder} className="block-icon" />
      <span className="block-name">Shared drive</span>
    </div>
  );
};

export default NavBlock;
