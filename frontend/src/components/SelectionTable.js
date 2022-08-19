import { useState } from "react";
import "../styles/table.scss";
import Pagination from "./Pagination";
import Loading from "./Loading";
// import Checkbox from "./inputs/Checkbox";

const SelectionTable = ({ selection, setSelection, data, headers }) => {
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const current = data && data.slice(indexOfFirst, indexOfLast);

  // Selecting one record in talbe
  const onSelect = (subject) => {
    // Checking if selection is already in array
    if (!selection.some((select) => select._id === subject._id)) {
      setSelection([...selection, subject]);
      return;
    }

    // Removing if selection is already in array
    setSelection(
      selection.filter((select) => {
        return select._id !== subject._id;
      })
    );
  };

  // Selecting all records in table
  const selectAll = (e) => {
    // If checkbox is checked then remove all from array
    if (!e.target.checked) {
      setSelection([]);
      return;
    }

    setSelection(data.map((subject) => subject));
  };

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="selection-table-wrapper">
      {data ? (
        <>
          <table className="selection-table">
            <tbody>
              <tr>
                <th>
                  <input type="checkbox" onClick={selectAll} />
                </th>
                {headers.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
              {current.map((subject) => {
                const isIncluded = selection.some(
                  (select) => select._id === subject._id
                );
                return (
                  <tr
                    key={subject._id}
                    className={isIncluded ? "selected" : ""}
                    name={subject.name}
                    onClick={() => onSelect(subject)}
                  >
                    <td>
                      <input type={"checkbox"} checked={isIncluded} readOnly />
                    </td>
                    <td>{subject.name}</td>
                    <td>{subject.type}</td>
                    <td>{subject.hours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            total={data.length}
            perPage={rowsPerPage}
            current={currentPage}
            setCurrent={setCurrentPage}
            paginate={paginate}
            setRows={setRowsPerPage}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SelectionTable;
