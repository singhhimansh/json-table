import React from "react";
import { useState } from "react";

export const Paginator = ({ pages, currentPage, handlePageChange }) => {
  return (
    <div className="paginatorBar">
      <button
        className="fixedButton"
        disabled={currentPage <= 0}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
      >
        Prev
      </button>
      <div className="pageOptions">
        {Array.from({ length: pages }, (v, i) => i)?.map((v) => {
          return (
            <button
              className={` ${v === currentPage ? "active" : "pageButton"}`}
              onClick={() => handlePageChange(v)}
            >
              {v + 1}
            </button>
          );
        })}
      </div>
      <button
        className="fixedButton"
        disabled={pages <= currentPage+1}
        onClick={() => handlePageChange(Math.min(currentPage +1, pages-1))}
      >
        Next
      </button>
    </div>
  );
};
