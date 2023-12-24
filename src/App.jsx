import React, { useEffect } from "react";
import { channels } from "./shared/constants";
const { ipcRenderer } = window.require("electron");

function App() {
  const getData = () => {
    console.log("button click is working");
    ipcRenderer.send(channels.GET_RPKS, { test: "test arg" });
  };
  useEffect(() => {
    // Listen for the event
    ipcRenderer.on(channels.GET_RPKS, (event, arg) => {
      console.log("data received", event, arg);
    });
    // Clean the listener after the component is dismounted
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  return (
    <div>
      <main className="main-container">
        <section id="sidebar-wrapper" className="sidebar-wrapper">
          <div className="scrollbox-wrapper">
            <ul className="sidebar-nav">
              <li>Home</li>
              <li>Package Manager</li>
              <li>Settings</li>
            </ul>
            <div className="menu-footer">
              <button onClick={() => ipcRenderer.send(channels.APP_EXIT)}>
                Exit
              </button>
            </div>
          </div>
        </section>
        <section className="main-wrapper">
          <div className="top-bar">
            <div className="top-bar-logo">
              <img src="https://picsum.photos/210/60" alt="logo" />
            </div>
            <div className="top-bar-content">
              Lorem Ipsum for now {new Date().toLocaleString()}
            </div>
          </div>
          <div className="page-container">
            <section id="core-concepts">
              <h2>Core Concepts</h2>
              <div>this is react application building with electron</div>
              <button onClick={getData}>Get data</button>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
