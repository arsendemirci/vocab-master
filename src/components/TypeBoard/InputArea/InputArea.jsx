import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { setOverflowFlag } from "#boardSlice";
import { IconButton } from "components";
import style from "./InputArea.module.scss";
import { useSelector, useDispatch } from "react-redux";

const InputArea = ({ onSubmitAnswer }) => {
  const store = useSelector((state) => state.boardStore);
  const dispatch = useDispatch();
  // const [word, setWord] = useState([]);
  // const [overflowActive, setOverflowActive] = useState(false);
  const refKey = useRef(null);
  const refArea = useRef(null);
  // const pushLetter = (letter) => {
  //   // setWord((word) => [...word, letter]);
  //   dispatch(addChar({ char }));
  // };
  // const deleteLetter = () => {
  //   word.splice(-1);
  //   setWord((word) => [...word]);
  // };
  const isOverflowActive = (event) => {
    const areaPaddingX =
      parseFloat(window.getComputedStyle(refArea.current).paddingLeft) +
      parseFloat(window.getComputedStyle(refArea.current).paddingRight);
    const areaLength = refArea.current.offsetWidth - areaPaddingX;

    return event.scrollWidth > areaLength;
  };
  // const onSubmitAnswer = (check) => {
  //   const answer = word.join("").replace(/\s+/g, " ").trim().toLowerCase();
  //   const isCorrect = answer && answer == check.toLowerCase();
  //   setWord([]);
  //   return { answer, isCorrect };
  // };

  useEffect(() => {
    if (isOverflowActive(refKey.current) && !store.overflowActive) {
      dispatch(setOverflowFlag({ isOverflow: true }));
    }
    if (!isOverflowActive(refKey.current) && store.overflowActive) {
      dispatch(setOverflowFlag({ isOverflow: false }));
    }
  });
  return (
    <div className={style["input-area"]} ref={refArea}>
      <div
        className={`${style.input} ${
          store.overflowActive && style["float-right"]
        }`}
        ref={refKey}
      >
        {store.word.map((w, index) => {
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
        onClick={onSubmitAnswer}
        iconHeight={32}
        iconWidth={32}
      />
    </div>
  );
};

export default InputArea;
