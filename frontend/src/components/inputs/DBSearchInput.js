import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DBSearchInput = ({ onClick, label, route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState();
  const axiosPrivate = useAxiosPrivate();

  const onChange = (e) => {
    // const value = e.target.value;

    const search = async () => {
      const value = e.target.value;
      if (value.length >= 3) {
        try {
          const response = await axiosPrivate.get(`${route}/${value}`);
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

  console.log(items);

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
