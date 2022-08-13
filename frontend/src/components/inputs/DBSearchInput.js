import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DBSearchInput = ({ value, onClick, label, route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(false);
  const [items, setItems] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length >= 3) {
        try {
          const response = await axiosPrivate.get(`${route}/${searchTerm}`);
          setDisplay(true);
          setItems(response.data);
        } catch (error) {
          console.error(error);
        }
      } else if (items !== undefined) {
        setDisplay(false);
        setItems();
      }
    };
    search();
  }, [searchTerm]);

  return (
    <>
      <Input
        label={label}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className={`search-list ${items ? "open" : ""}`}>
        {items && items.length !== 0 ? (
          items.map((item, i) => (
            <li className="search-list-item" key={`list-item-${i}`}>
              <button
                className="search-list-button"
                onClick={() => {
                  onClick(item);
                  setSearchTerm(item.name);
                  setDisplay(false);
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
