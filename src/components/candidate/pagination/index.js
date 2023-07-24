import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = ({ totalCandis, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCandis / 20); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav-pagination">
      <ul className="pagination pagination-sm">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <NavLink onClick={() => paginate(number)} to="#" className="page-link">
              {number}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
