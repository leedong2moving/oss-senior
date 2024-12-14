import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">국회의원 정보 서비스</a>
        <ul className="navbar-links">
          <li>
            <Link to="/login" className="navbar-link">로그인</Link>
          </li>
          <li>
            <Link to="/signup" className="navbar-link">회원가입</Link>
          </li>
          <li>
            <Link to="/mypage" className="navbar-link">마이페이지</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
