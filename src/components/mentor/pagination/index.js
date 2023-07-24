import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = ({ mentorPerPage, totalMentor, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMentor / mentorPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav-pagination">
      <ul className="pagination pagination-sm">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <NavLink onClick={() => paginate(number)} to="/mentor" className="page-link">
              {number}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
