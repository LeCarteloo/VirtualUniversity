import "../../styles/admin.scss";
import SearchInput from "../SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEllipsis,
  faGear,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import { useEffect, useState } from "react";

const AdminTable = ({
  title,
  data,
  headers,
  onAdd,
  onEdit,
  onRemove,
  onSee,
}) => {
  // Hooks for keeping the order state and the filtered data
  const [order, setOrder] = useState(1);
  const [items, setItems] = useState();

  // Refreshing component after data changes
  useEffect(() => {
    setItems(data);
  }, [data]);

  // Function for sorting columns (ASC / DESC)
  const sortColumn = (column) => {
    const sortedItems = items.sort((a, b) =>
      a[column] > b[column] ? order : -order
    );
    setItems(sortedItems);
    setOrder(-order);
  };

  // Searching function for search input
  const onSearch = (value) => {
    if (value !== "") {
      const searchData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setItems(searchData);
    } else {
      setItems(data);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="wrapper-header">
        <h2 className="table-title"> {title} </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="btn-add">
            <FontAwesomeIcon icon={faPlus} size={"lg"} />
          </button>
          <SearchInput
            placeholder={`Search for ${title.toLowerCase()}...`}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-slider">
        <table className="table-normal">
          <tbody>
            <tr>
              {headers &&
                headers.map((header, key) => (
                  <th
                    key={key}
                    onClick={() => sortColumn(header.toLowerCase())}
                  >
                    {header}
                  </th>
                ))}
              <th>Action</th>
            </tr>
            {items &&
              items.map((user, key) => (
                <tr key={key}>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.album}</td>
                  <td>
                    <div className="action-btn">
                      <FontAwesomeIcon icon={faEllipsis} size="xl" />
                      <div className="action-tooltip">
                        <button className="action-row">
                          <span>See more</span>
                          <FontAwesomeIcon icon={faEye} size="lg" />
                        </button>
                        <button className="action-row">
                          <span>Edit User</span>
                          <FontAwesomeIcon icon={faGear} size="lg" />
                        </button>
                        <button className="action-row">
                          <span>Remove User</span>
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!items ? (
          <Loading />
        ) : (
          items.length === 0 && (
            <p style={{ textAlign: "center" }}>No data to display...</p>
          )
        )}
      </div>
    </div>
  );
};

export default AdminTable;
