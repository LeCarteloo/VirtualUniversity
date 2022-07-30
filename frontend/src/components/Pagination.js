import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Pagination = ({
  perPage,
  total,
  paginate,
  current,
  setRows,
  setCurrent,
}) => {
  const [disabled, setDisabled] = useState(["left"]);

  const numberOfPages = Math.ceil(total / perPage);

  const onPagination = (nextPage) => {
    console.log(nextPage, numberOfPages);

    if (nextPage > 0 && nextPage <= numberOfPages) {
      paginate(nextPage);
    }

    if (nextPage + 1 > numberOfPages) {
      setDisabled(["right"]);
      return;
    } else if (nextPage - 1 <= 0) {
      setDisabled(["left"]);
      return;
    }

    setDisabled([]);
  };

  /* Watching the number of pages and disabling buttons if
  1 page show all the results */
  useEffect(() => {
    if (numberOfPages === 1) {
      setDisabled(["left", "right"]);
    }
  }, [numberOfPages]);

  return (
    <nav className="pagination-nav">
      <select
        defaultValue={3}
        onChange={(e) => {
          setDisabled("left");
          setCurrent(1);
          setRows(e.target.value);
        }}
      >
        <option>2</option>
        <option>3</option>
        <option>5</option>
        <option>10</option>
      </select>
      <span>
        {`${current * perPage - (perPage - 1)} - ${
          current * perPage >= total ? total : current * perPage
        } of ${total}`}
      </span>
      <button
        className="pagination-btn"
        onClick={() => onPagination(current - 1)}
        disabled={disabled.includes("left")}
      >
        <FontAwesomeIcon icon={faAngleLeft} size="xl" />
      </button>
      <button
        className="pagination-btn"
        onClick={() => onPagination(current + 1)}
        disabled={disabled.includes("right")}
      >
        <FontAwesomeIcon icon={faAngleRight} size="xl" />
      </button>
    </nav>
  );
};

export default Pagination;
