import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { FaDatabase, FaMoneyBillWave, FaQrcode, FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import Logo from "../assets/images/logo.png";

function Sidemenubar({ children }) {
  const [activeLink, setActiveLink] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const token = localStorage.getItem("token");

  if (!token || location.pathname === "/") {
    return null; // hide sidebar on login
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="layout">
      {/* 🔹 Header */}
      <div className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)} />
        <img src={Logo} alt="Logo" />
        <button onClick={handleLogout}>
          <LuLogOut /> Logout
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <div className={`side-menu ${sidebarOpen ? "open" : ""}`}>
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Data"
              className={activeLink === "/Data" ? "active" : ""}
              onClick={() => {
                setActiveLink("/Data");
                closeSidebar();
              }}
            >
              <FaDatabase />
              <span className="link-text">Data</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Withdraw"
              className={activeLink === "/Withdraw" ? "active" : ""}
              onClick={() => {
                setActiveLink("/Withdraw");
                closeSidebar();
              }}
            >
              <FaMoneyBillWave />
              <span className="link-text">Withdraw</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/QR"
              className={activeLink === "/QR" ? "active" : ""}
              onClick={() => {
                setActiveLink("/QR");
                closeSidebar();
              }}
            >
              <FaQrcode />
              <span className="link-text">QR</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* 🔹 Dark Overlay on Mobile */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* 🔹 Page Content */}
      <div className={`content-area ${sidebarOpen ? "blurred" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default Sidemenubar;
