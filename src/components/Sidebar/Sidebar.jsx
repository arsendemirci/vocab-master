import "./Sidebar.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { channels } from "constants";
const { ipcRenderer } = window.require("electron");
import { Icon } from "components";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-wrapper">
      <div className="scrollbox-wrapper">
        <nav>
          <ul className="sidebar-nav">
            <li onClick={() => navigate("/")}>
              <Icon icon="home" /> <label>Home</label>
            </li>
            <li onClick={() => navigate("/words")}>
              <Icon icon="package" />
              <label>Words</label>
            </li>
            <li onClick={() => navigate("/profile")}>
              <Icon icon="gear" />
              <label>Profile</label>
            </li>
          </ul>
        </nav>

        <div className="menu-footer">
          <button onClick={() => ipcRenderer.send(channels.APP_EXIT)}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
