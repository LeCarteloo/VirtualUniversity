import "../styles/table.scss";

const Table = ({ headers, rows, bg, padd, orientation }) => {
  // orientation = "vertical-rl";
  return (
    <div className={`table ${orientation}`} style={{ backgroundColor: bg }}>
      {headers.map((header, i) => (
        <div key={i} className="column">
          <div className="row">
            <span className="row-header" style={{ padding: padd }}>
              {header}
            </span>
            <span className="row-content" style={{ padding: padd }}>
              {rows[i]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

Table.defaultProps = {
  orientation: "horizontal",
};

export default Table;
