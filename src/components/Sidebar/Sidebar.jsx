import "./Sidebar.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { links } from "#routes";
import { useIPC } from "#hooks";
import { startGame } from "#gameSlice";
import { Icon, ProfileCard } from "components";

function Sidebar() {
  const navigate = useNavigate();
  const ipc = useIPC();
  // const dispatch = useDispatch();
  // const startQuickGame = async () => {
  //   const gameData = await ipc.getQuickGame();
  //   console.log("game data", gameData);
  //   dispatch(startGame({ gameData }));
  //   navigate("/");
  // };

  return (
    <div>
      <div className="sidebar-left-top"></div>
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <div className="scrollbox-wrapper">
          <nav>
            <ul className="sidebar-nav">
              <li onClick={() => navigate(links.QuickGame())}>
                <Icon icon="play" /> <label>Quick Play</label>
              </li>
              <li
                className="active"
                onClick={() => navigate(links.CreateGame())}
              >
                <Icon icon="home" /> <label>Create Game</label>
              </li>
              <li onClick={() => navigate(links.Words())}>
                <Icon icon="package" />
                <label>Words</label>
              </li>
              <li onClick={() => navigate(links.Profile())}>
                <Icon icon="gear" />
                <label>Profile</label>
              </li>
              {/* <li onClick={() => navigate(links.Account())}>
                <Icon icon="gear" />
                <label>Account</label>
              </li> */}
              <li onClick={() => ipc.applicationExit()}>
                <Icon icon="power" />
                <label>Quit</label>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <ProfileCard />
    </div>
    </div>

  );
}
export default Sidebar;
