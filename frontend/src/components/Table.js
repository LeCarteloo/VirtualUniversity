import "../styles/table.scss";

const Table = ({ headers, rows, bg, padd, orient, mOrient }) => {
  // orientation = "vertical-rl";
  return (
    <div className={`table ${orient}`} style={{ backgroundColor: bg }}>
      {headers.map((header, i) => (
        <div key={i} className="column">
          <div className="row">
            <span className="row-header" style={{ padding: padd }}>
              {header}
            </span>
            <span className="row-content" style={{ padding: padd }}>
              {rows[i] !== undefined ? rows[i].toString() : "-"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

Table.defaultProps = {
  orient: "horizontal",
};

export default Table;
