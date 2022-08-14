import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DBSearchInput = ({ value, onClick, label, route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState();
  const axiosPrivate = useAxiosPrivate();

  // Displaying default value
  useEffect(() => {
    value && setSearchTerm(value);
  }, []);

  const onChange = (e) => {
    const search = async () => {
      const query = e.target.value;
      if (query.length >= 3) {
        try {
          const response = await axiosPrivate.get(`${route}/${query}`);
          setItems(response.data);
        } catch (error) {
          console.error(error);
        }
      } else if (items !== undefined) {
        setItems();
      }
    };

    search();
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Input label={label} value={searchTerm} onChange={onChange} />
      <ul className={`search-list ${items ? "open" : ""}`}>
        {items && items.length !== 0 ? (
          items.map((item, i) => (
            <li className="search-list-item" key={`list-item-${i}`}>
              <button
                className="search-list-button"
                onClick={() => {
                  onClick(item);
                  setSearchTerm(item.name);
                  setItems();
                }}
              >
                <FontAwesomeIcon icon={faUser} size="xl" />
                <div>
                  <span>{item.name}</span>
                  {item.extra && <span>{item.extra}</span>}
                </div>
              </button>
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </>
  );
};

export default DBSearchInput;
