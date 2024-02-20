import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Button, Icon } from "components";
import { dialogComponents, dialog } from "components/Dialogs";
import { createPortal } from "react-dom";


const LoadDialog = (props) => {
  if (typeof dialogComponents[props.component] !== "undefined") {
    return React.createElement(dialogComponents[props.component]);
  }
  return React.createElement(() => (
    <div>The component has not been created yet.</div>
  ));
};

function Modal({ show, close, component }) {
  const [hidden, setHidden] = useState(false);

  const closeClick = () => {
    setHidden(true);
  };
  let wrapperClass = `${styles.wrapper} ${show && styles.show} ${
    hidden && styles.hide
  } `;
  const containerClass = `${styles.container}`;
  useEffect(() => {
    if (hidden) {
      setTimeout(() => {
        close();
        setHidden(false);
      }, 1000);
    }
  }, [hidden]);
  return createPortal(
    <>
      <div className={wrapperClass}>
        <div>
          <Button onClick={closeClick}>
            <Icon icon="times" width={24} height={24} color="white" />
          </Button>
          <div className={containerClass}>
            {LoadDialog({ component })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
