import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../App.css';

// PUBLIC_INTERFACE
function Navbar({ onShare }) {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ background: 'var(--primary, #F7C59F)' }}>
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <div className="logo" style={{color: 'var(--accent, #F67280)', fontWeight: 700, letterSpacing: 0.5}}>
          <span role="img" aria-label="paw" className="logo-symbol" style={{fontSize: 28, marginRight: 8}}>🐾</span>
          PetMemories Chronicle
        </div>
        <nav style={{display: 'flex', gap: 18, alignItems: 'center'}}>
          <NavLink to="/" end className={({isActive}) => isActive || location.pathname === '/' ? "nav-link--active nav-link" : "nav-link"}>Profile</NavLink>
          <NavLink to="/timeline" className={({isActive}) => isActive ? "nav-link--active nav-link" : "nav-link"}>Timeline</NavLink>
          <NavLink to="/photos" className={({isActive}) => isActive ? "nav-link--active nav-link" : "nav-link"}>Photos</NavLink>
          <NavLink to="/milestones" className={({isActive}) => isActive ? "nav-link--active nav-link" : "nav-link"}>Milestones</NavLink>
          <NavLink to="/scrapbook" className={({isActive}) => isActive ? "nav-link--active nav-link" : "nav-link"}>Scrapbook</NavLink>
          <button className="btn" style={{ marginLeft: 8, background: 'var(--secondary, #A1C6EA)', color: '#222', fontWeight: 500}} onClick={onShare}>Share</button>
        </nav>
      </div>
      <style>{`
        .nav-link {
          color: #444;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 7px 5px;
          margin-left: 4px;
          transition: color 0.15s;
        }
        .nav-link--active {
          color: var(--accent, #F67280);
          text-decoration: underline;
        }
        .nav-link:hover {
          color: var(--accent, #F67280);
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
