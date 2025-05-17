import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { useSelector } from "react-redux";
function Footer() {
  const user = useSelector((state) => state.auth.user);
  return (
    <footer className="footer ">
      <div className="footer-container">
        <div className="footer-logo">Eventify</div>

        <ul className="flex gap-6 text-sm">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            {user?.role === "admin" ? (
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
            ) : (
              <Link to="/eventlist" className="link">
                Event List
              </Link>
            )}
          </li>

          <li>
            <Link to="/" className="link">
              Contact
            </Link>
          </li>
        </ul>

        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
