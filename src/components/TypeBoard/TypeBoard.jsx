import React, { useRef, useState, useReducer, useEffect } from "react";

import "./TypeBoard.scss";
import { GameStatus } from "constants";

import { Keyboard, InputArea, Button, QuestionBoard, Icon } from "components";
import { playAudio } from "gameUtils";
import { sum } from "arrayUtils";
import {
  gameReducer,
  NEXT_QUESTION,
  RESTART_GAME,
  START_GAME,
} from "/src/reducers/gameReducer";
const { ipcRenderer } = window.require("electron");

function TypeBoard() {
  const [state, dispatch] = useReducer(gameReducer, {
    status: GameStatus.NOT_STARTED,
  });
  const startGame = (event, isRestart) => {
    if (isRestart) {
      console.log("buraya mi geliyor?", isRestart);
      dispatch({ type: RESTART_GAME });
    } else {
      ipcRenderer.send("GET_GAME");
    }
  };
  const refInput = useRef(null);

  const setText = (key) => {
    refInput.current.pushLetter(key);
  };

  const handleBackspace = () => {
    refInput.current.deleteLetter();
  };

  const submitAnswer = () => {
    const { answer, isCorrect } = refInput.current.onSubmitAnswer(
      state.questions[state.activeQuestion - 1].check
    );
    dispatch({
      type: NEXT_QUESTION,
      answer: answer,
      isCorrect: isCorrect,
    });
  };

  const handleEnter = () => {
    submitAnswer();
  };
  useEffect(() => {
    console.log("state degisti", state);
  }, [state]);
  useEffect(() => {
    if (state.activeQuestion !== 0 && state.status === GameStatus.ACTIVE) {
      playAudio(state.questions[state.activeQuestion - 1].question);
    }
  }, [state.activeQuestion]);
  useEffect(() => {
    ipcRenderer.on("GET_GAME", (event, arg) => {
      console.log("data geldi", event, arg);
      dispatch({ type: START_GAME, gameData: arg });
    });
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);
  return (
    <div>
      {state.status === GameStatus.NOT_STARTED ? (
        <Button onClick={startGame}>Start Game</Button>
      ) : state.status === GameStatus.ACTIVE ? (
        <div className="typeboard">
          <QuestionBoard
            onSubmitAnswer={submitAnswer}
            question={state.questions[state.activeQuestion - 1].question}
          />
          <InputArea ref={refInput} onSubmitAnswer={submitAnswer} />
          <hr className="divider" />
          <Keyboard
            setText={setText}
            handleBackspace={handleBackspace}
            handleEnter={handleEnter}
          />
        </div>
      ) : (
        <div className="score-board">
          <h3>Game Over</h3>
          <div className="table">
            <div className="row header">
              <div>Word</div> <div>Correct Answer</div> <div>Your Answer</div>
              <div className="itemIcon"></div>
            </div>
            {state.questions.map((q, index) => {
              return (
                <div
                  key={index}
                  className={`row ${q.isCorrect ? "correct" : "wrong"}`}
                >
                  <div>{q.question}</div>
                  <div>{q.check}</div>
                  <div>{q.answer}</div>
                  <div className="itemIcon">
                    <Icon
                      width={34}
                      height={34}
                      icon={q.isCorrect ? "check" : "times"}
                    />
                  </div>
                </div>
              );
            })}
            <div className="row score">
              <div className="score-label">Total Score : </div>
              <div className="score-value">{sum(state.questions, "score")}</div>
            </div>
          </div>
          <div>
            <Button onClick={startGame}>Start Another Game</Button>
            <Button onClick={(e) => startGame(e, true)}>Restart Game</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TypeBoard;
