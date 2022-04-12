import "../styles/table.scss";

const Table = ({ headers, rows, bg }) => {
  return (
    <table>
      <tbody>
        <tr>
          {headers.map((header) => (
            <th key={header}> {header} </th>
          ))}
        </tr>
        <tr>
          {rows.map((row) => (
            <td key={row}> {row} </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
