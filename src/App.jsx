import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Profile, Words } from "./views";
import { Sidebar, Topbar } from "components";

function App() {
  return (
    <div>
      <main className="main-container">
        <Topbar />
        <section className="main-wrapper">
          <Sidebar />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/words" element={<Words />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
