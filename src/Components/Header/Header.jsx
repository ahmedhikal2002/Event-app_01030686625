import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { logout } from "../../Store/AuthSlice/ThunkAuth";
function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/login"));
  };

  return (
    <header className="flex-bet header">
      <NavLink to={`${user?.role === "admin" ? "/dashboard" : "/"}`}>
        <img src={Logo} alt="Main logo" />
      </NavLink>
      <nav className="flex-gap">
        {user?.role === "admin" ? (
          <NavLink to="/dashboard/add">Create event</NavLink>
        ) : (
          <NavLink to="/eventlist">Booklist</NavLink>
        )}
        {user ? (
          <div className="username flex-column font-medium text-[13px]">
            Hello {user?.displayName}
          </div>
        ) : (
          <NavLink to="/signup">Register</NavLink>
        )}

        <NavLink to={`${user ? "/" : "/login"}`}>
          {user ? <p onClick={handleLogout}>Logout</p> : "Login"}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
