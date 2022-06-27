import "../styles/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ onChange, placeholder }) => {
  return (
    <div className="search-input">
      <FontAwesomeIcon icon={faSearch} size="lg" />
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
