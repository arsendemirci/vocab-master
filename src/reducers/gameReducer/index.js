import { GameStatus } from "constants";
import { NEXT_QUESTION, START_GAME, RESTART_GAME } from "./actions.js";

const gameReducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        questions: action.gameData,
        status: GameStatus.ACTIVE,
        activeQuestion: 1,
      };
    }
    case NEXT_QUESTION: {
      //check and set status of the game
      const gameOver = state.activeQuestion === state.questions.length;

      let questions = state.questions;
      questions[state.activeQuestion - 1] = {
        ...questions[state.activeQuestion - 1],
        answer: action.answer,
        isCorrect: action.isCorrect,
        score: action.isCorrect ? 10 : 0,
      };

      return {
        ...state,
        questions: questions,
        status: gameOver ? GameStatus.GAME_OVER : state.status,
        activeQuestion: gameOver ? 0 : state.activeQuestion + 1,
        score: action.isCorrect ? state.score + 10 : state.score,
      };
    }
    case RESTART_GAME: {
      let questions = state.questions;
      questions.map((q) => {
        return { ...q, answer: "", score: 0 };
      });
      return {
        ...state,
        questions: questions,
        status: GameStatus.ACTIVE,
        activeQuestion: 1,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export { gameReducer, NEXT_QUESTION, START_GAME, RESTART_GAME };
