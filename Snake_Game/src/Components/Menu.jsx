import Button from "./Button";
import "./Menu.css";

function Menu({ startGame, gameOver }) {
  return (
    <div className="menu">

      <h1>Snake Game</h1>

      {gameOver && (
        <h3>Game Over!</h3>
      )}

      <Button
        text={gameOver ? "Restart Game" : "Start Game"}
        onClick={startGame}
      />

    </div>
  );
}

export default Menu;