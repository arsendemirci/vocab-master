import React, { useRef, useState, useEffect } from "react";
import "./TypeBoard.scss";

import { Keyboard, InputArea } from "components";

function TypeBoard() {
  const refInput = useRef(null);
  const setText = (key) => {
    refInput.current.pushLetter(key);
  };

  const handleBackspace = () => {
    refInput.current.deleteLetter();
  };

  return (
    <div className="typeboard">
      <InputArea ref={refInput} />
      <hr className="divider" />
      <Keyboard setText={setText} handleBackspace={handleBackspace} />
    </div>
  );
}

export default TypeBoard;
