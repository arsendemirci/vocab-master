import React from "react";
import { TypeBoard, GameCreate, ScoreBoard } from "components";
// import { useSelector } from "react-redux";
// import { gameConfig } from "config";
function Game() {
  // const gameState = useSelector((state) => state.gameStore.game);
  // const SwitchView = () => {
  //   return gameState.status === gameConfig.status.NOT_STARTED ? (
  //     <GameCreate />
  //   ) : (
  //     <TypeBoard />
  //   );
  // };
  return (
    <div>
      <section>
        <GameCreate />
        <TypeBoard />
        <ScoreBoard />
      </section>
    </div>
  );
}

export default Game;
