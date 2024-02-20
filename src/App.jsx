import React, { useEffect, useState } from "react";
import { Sidebar, Topbar, SplashScreen, Modal } from "components";
import Router from "./router/Router.jsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "#modalSlice";

function App() {
  const location = useLocation();
  const modal = useSelector((state) => state.modalStore);
  console.log("modal component", modal);
  const dispatch = useDispatch();
  // const [modal, setModal] = useState(false);
  // const Toggle = () => setModal(!modal);
  // const appState = useSelector((state) => state.gameStore.game);
  // useEffect(() => {
  //   console.log("APP LEVEL STATE CHANGE", appState);
  // }, [appState]);
  useEffect(() => {
    console.log("Location changed", location);
  }, [location]);
  return (
    <div>
      <SplashScreen />
      <main className="main-container">
        <Sidebar />

        <section className="main-wrapper">
          <Topbar />
          <div className="page-container">
            <Router />
          </div>
        </section>
      </main>

      {modal.component && (
        <Modal
          component={modal.component}
          show={modal.show}
          close={() => dispatch(hideModal())}
        />
      )}
    </div>
  );
}

export default App;
