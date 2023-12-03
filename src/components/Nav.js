import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-links">
      <div className="nav-items">
        <NavLink to="/readclients" activeClassName="active-link">Clients</NavLink>
        <NavLink to="/readagents" activeClassName="active-link">Agents</NavLink>
        <NavLink to="/readreports" activeClassName="active-link">Reports</NavLink>
        <NavLink to="/readobjects" activeClassName="active-link">Estate Objects</NavLink>
        <NavLink to="/readtransactions" activeClassName="active-link">Transaction</NavLink>
      </div>
      <NavLink to="/createclient" className="new-button">New</NavLink>
    </nav>
  );
};

export default Nav;

