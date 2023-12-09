import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar.css';

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
      <div className="new-buttons-container">
        <NavLink to="/createclient" className="new-button">New cl</NavLink>
        <NavLink to="/createagent" className="new-button">New ag</NavLink>
        <NavLink to="/createreport" className="new-button">New rep</NavLink>
        <NavLink to="/createobject" className="new-button">New ob</NavLink>
        <NavLink to="/createtransaction" className="new-button">New tr</NavLink>
      </div>
    </nav>
  );
};


export default Nav;

