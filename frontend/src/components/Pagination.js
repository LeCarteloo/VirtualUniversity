import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Pagination = ({
  perPage,
  total,
  paginate,
  current,
  setRows,
  setCurrent,
}) => {
  const [disabled, setDisabled] = useState("left");

  const onPagination = (nextPage) => {
    const numberOfPages = Math.ceil(total / perPage);
    if (nextPage >= 0 || nextPage < numberOfPages) {
      paginate(nextPage);
    }

    if (nextPage + 1 > numberOfPages) {
      setDisabled("right");
      return;
    } else if (nextPage - 1 <= 0) {
      setDisabled("left");
      return;
    }
  };

  console.log(current, perPage, total);

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
        disabled={disabled === "left"}
      >
        <FontAwesomeIcon icon={faAngleLeft} size="xl" />
      </button>
      <button
        className="pagination-btn"
        onClick={() => onPagination(current + 1)}
        disabled={disabled === "right"}
      >
        <FontAwesomeIcon icon={faAngleRight} size="xl" />
      </button>
    </nav>
  );
};

export default Pagination;
