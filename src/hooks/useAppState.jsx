import React, { useEffect } from "react";
import { hideLoader, showLoader, hideModal, showModal } from "#appSlice";

import { useSelector, useDispatch } from "react-redux";
// Hook
function useAppState() {
  const appState = useSelector((state) => state.appStore);
  const dispatch = useDispatch();
  const loaderShow = () => {
    dispatch(showLoader());
  };
  const loaderHide = (actionOnHide) => {
    setTimeout(() => {
      dispatch(hideLoader());
      actionOnHide && actionOnHide();
    }, 2500);
  };
  const modalShow = (component) => {
    dispatch(showModal({ component }));
  };
  const modalHide = () => {
    dispatch(hideModal());
  };

  useEffect(
    () => {
      if (appState.loader.show) {
        console.log("loader is showing");
        // setTimeout(() => {
        //   dispatch(hideLoader());
        //   onLoadFinish && onLoadFinish();
        // }, 2500);
      } else {
        console.log("loader is hiding");
      }
    },
    [appState.loader.show] // Re-run if eventName or element changes
  );

  return {
    showLoader: loaderShow,
    showModal: modalShow,
    hideLoader: loaderHide,
    hideModal: modalHide,
  };
}

export default useAppState;
