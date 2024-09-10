import "./tableStyle.css";

export const TableRow = ({ row, rowKey, columns }) => {
  return (
    <tr className="tbRow">
      {columns?.map((column) => (
        <td className="tbCell" key={column.key}>
          {column.Component ? <column.Component row={row} /> : row[column.key]}
        </td>
      ))}
    </tr>
  );
};
