import { useState } from "react";
import "../styles/table.scss";
import Pagination from "./Pagination";
import Loading from "./Loading";

const SelectionTable = ({ data, headers }) => {
  const [selection, setSelection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const current = data && data.slice(indexOfFirst, indexOfLast);

  const onSelect = (id) => {
    if (!selection.includes(id)) {
      setSelection([...selection, id]);
      return;
    }

    setSelection(
      selection.filter((select) => {
        return select !== id;
      })
    );
  };

  const selectAll = (e) => {
    if (!e.target.checked) {
      setSelection([]);
      return;
    }

    setSelection(data.map((subject) => subject._id));
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
                const isIncluded = selection.includes(subject._id);
                return (
                  <tr
                    key={subject._id}
                    className={isIncluded ? "selected" : ""}
                    name={subject.name}
                    onClick={() => onSelect(subject._id)}
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
