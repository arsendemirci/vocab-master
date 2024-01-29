import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Game, Profile, Words } from "#views";
import { Sidebar, Topbar } from "components";

function App() {
  // const appState = useSelector((state) => state.gameStore.game);
  // useEffect(() => {
  //   console.log("APP LEVEL STATE CHANGE", appState);
  // }, [appState]);
  return (
    <div>
      <main className="main-container">
        <Sidebar />

        <section className="main-wrapper">
          <Topbar />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Game />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/words" element={<Words />} />
              <Route path="*" element={<Game />} />
            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
