import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { clearStore } from "../features/user/userSlice";

const Navbar: React.FC = () => {
  const [showLogOut, setShowLogout] = useState(false);
  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={() => toggle()}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogOut)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogOut ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore("Logging out..."))}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
