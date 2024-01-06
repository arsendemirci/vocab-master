import "./Topbar.scss";
import React from "react";

function Topbar() {
  return (
    <div className="top-bar">
      <div className="top-bar-logo">
        <img src="https://picsum.photos/210/60" alt="logo" />
      </div>
      <div className="top-bar-content">
        Lorem Ipsum for now {new Date().toLocaleString()}
      </div>
    </div>
  );
}
export default Topbar;
