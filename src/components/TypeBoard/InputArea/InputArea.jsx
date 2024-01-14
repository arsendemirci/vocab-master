import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { IconButton } from "components";
import style from "./InputArea.module.scss";

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
  const onSubmitAnswer = (check) => {
    const answer = word.join("").replace(/\s+/g, " ").trim();
    const isCorrect = answer && answer == check;
    setWord([]);
    return { answer, isCorrect };
  };

  useImperativeHandle(ref, () => ({
    pushLetter,
    deleteLetter,
    onSubmitAnswer,
    setWord,
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
    <div className={style["input-area"]} ref={refArea}>
      <div
        className={`${style.input} ${overflowActive && style["float-right"]}`}
        ref={refKey}
      >
        {word.map((w, index) => {
          let styles = {};
          if (w === " ") {
            styles["marginLeft"] = "10px";
          }

          return (
            <div key={index} className={style["input-char"]} style={styles}>
              {w}
            </div>
          );
        })}
      </div>
      <IconButton
        className={style.icon}
        iconName="send"
        onClick={props.onSubmitAnswer}
        iconHeight={32}
        iconWidth={32}
      />
    </div>
  );
});

export default InputArea;
