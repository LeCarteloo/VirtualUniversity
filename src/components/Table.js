import "../styles/table.scss";

const Table = ({ headers, rows, bg, padd, orientation }) => {
  return (
    <table className={orientation} style={{ backgroundColor: bg }}>
      <tbody>
        <tr>
          {headers.map((header, i) => (
            <th key={i} style={{ padding: padd }}>
              {header}
            </th>
          ))}
        </tr>
        <tr>
          {rows.map((row, i) => (
            <td key={i} style={{ padding: padd }}>
              {row}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
