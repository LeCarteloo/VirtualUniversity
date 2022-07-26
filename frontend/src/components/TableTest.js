import { useState } from "react";
import "../styles/table.scss";
import Pagination from "./Pagination";

const TableTest = ({ rows, bg, padd, orient, mOrient }) => {
  const [selection, setSelection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // orientation = "vertical-rl";

  const headers = ["-", "Name", "Type", "Hours"];

  const subjects = [
    { _id: "1", name: "Name1", type: "Type1", hours: 3 },
    { _id: "2", name: "Name2", type: "Type1", hours: 5 },
    { _id: "3", name: "Name3", type: "Type1", hours: 6 },
    { _id: "4", name: "Name4", type: "Type1", hours: 7 },
  ];

  console.log("refresh");

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const current = subjects.slice(indexOfFirst, indexOfLast);

  console.log(current);

  const onClick = (id) => {
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

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="table-wrapper-test">
      <table className="table-test">
        <tbody>
          <tr>
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
                onClick={() => onClick(subject._id)}
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
        total={subjects.length}
        perPage={rowsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

TableTest.defaultProps = {
  orient: "horizontal",
};

export default TableTest;
