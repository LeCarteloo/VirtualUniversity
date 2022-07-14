import "../../styles/admin.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEllipsis,
  faGear,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../SearchInput";
import Loading from "../Loading";
import Modal from "../Modal";
import Input from "../Input";

const AdminTable = ({ title, data, headers, onAdd, onEdit, onRemove }) => {
  // Hooks for keeping the order state and the filtered data
  const [order, setOrder] = useState(1);
  const [items, setItems] = useState();
  const [modal, setModal] = useState({ show: false, data: {} });

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

  // Display modal
  const displayModal = (items) => {
    if (!items) {
      return;
    }

    return (
      <Modal
        title={"More details"}
        show={modal.show}
        onClose={() => setModal({ show: false, data: {} })}
      >
        {Object.keys(items).map((itemKey, i) =>
          Array.isArray(items[itemKey]) ? (
            <details key={`array-details-${i}`}>
              <summary>{itemKey.toString()}</summary>
              <div>
                {items[itemKey].map((obj, j) => (
                  <div key={`array-div-${j}`} className="array-display">
                    {Object.keys(obj).map((objKey, k) => (
                      <Input
                        key={`array-input-${k}`}
                        label={objKey.toString()}
                        labelBg="#2f3142"
                        value={obj[objKey].toString()}
                        isReadOnly={true}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </details>
          ) : (
            <Input
              key={`modal-input-${i}`}
              label={itemKey.toString()}
              value={items[itemKey].toString()}
              isReadOnly={true}
            />
          )
        )}
      </Modal>
    );
  };

  // Open modal and display provided data
  const onSee = (id) => {
    const foundData = data.find((obj) => obj._id === id);
    setModal({ show: !modal.show, data: foundData });
  };

  return (
    <>
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
                      key={`header-${key}`}
                      onClick={() => sortColumn(header.toLowerCase())}
                    >
                      {header}
                    </th>
                  ))}
                <th>Action</th>
              </tr>
              {items &&
                items.map((item, i) => (
                  <tr key={`row-${i}`}>
                    {headers.map((header, j) => (
                      <td key={`cell-${j}`}>{item[header.toLowerCase()]}</td>
                    ))}
                    <td>
                      <div className="action-btn">
                        <FontAwesomeIcon icon={faEllipsis} size="xl" />
                        <div className="action-tooltip">
                          <button
                            className="action-row"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSee(item._id);
                            }}
                          >
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
      {displayModal(modal.data)}
    </>
  );
};

export default AdminTable;
