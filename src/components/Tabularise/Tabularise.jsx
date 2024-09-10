import "./tableStyle.css";
import React from "react";
import { TableRow } from "./TableRow";
import { useMemo } from "react";
import { Paginator } from "./Paginator";
import { useState } from "react";

export const Tabularise = ({ data, label, columns, pageSize }) => {
  const size = pageSize || data.length;

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = useMemo(() => {
    const start = currentPage * size;
    const end = start + size;
    return data.slice(start, end);
  }, [data, currentPage, size]);
  return (
    <div>
      {label && <div>Tabularise</div>}
      <div>
        <table className="table">
          <thead>
            <tr className="tbRow">
              {columns?.map((item) => (
                <th className="tbHeaderCell tbCell" key={item.key}>
                  {item.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row) => (
              <TableRow row={row} columns={columns} />
            ))}
          </tbody>
        </table>

        {pageSize && (
          <Paginator
            pages={Math.ceil(data.length / pageSize)}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
