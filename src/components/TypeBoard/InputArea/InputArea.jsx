import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import "./InputArea.scss";

// import useEventListener from "../../../hooks/useEventListener.jsx";

const InputArea = forwardRef((props, ref) => {
  const [word, setWord] = useState([]);
  const [overflowActive, setOverflowActive] = useState(false);
  const refKey = useRef(null);
  const refArea = useRef(null);
  const pushLetter = (letter) => {
    setWord((word) => [...word, letter]);
  };
  const deleteLetter = () => {
    word.splice(-1);
    setWord((word) => [...word]);
  };
  const isOverflowActive = (event) => {
    const areaPaddingX =
      parseFloat(window.getComputedStyle(refArea.current).paddingLeft) +
      parseFloat(window.getComputedStyle(refArea.current).paddingRight);
    const areaLength = refArea.current.offsetWidth - areaPaddingX;

    return event.scrollWidth > areaLength;
  };

  useImperativeHandle(ref, () => ({
    pushLetter,
    deleteLetter,
  }));

  useEffect(() => {
    if (isOverflowActive(refKey.current) && !overflowActive) {
      setOverflowActive(true);
    }
    if (!isOverflowActive(refKey.current) && overflowActive) {
      setOverflowActive(false);
    }
  });
  return (
    <div className="input-area" ref={refArea}>
      <div
        className={`input ${overflowActive ? "float-right" : ""}`}
        ref={refKey}
      >
        {word.map((w, index) => {
          let style = {};
          if (w === " ") {
            style["marginLeft"] = "10px";
          }

          return (
            <div key={index} className="input-char" style={style}>
              {w}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default InputArea;
