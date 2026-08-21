import { useEffect, useState } from "react";

import Snake from "./Components/Snake";
import Food from "./Components/Food";
import Menu from "./Components/Menu";

import "./App.css";

function App() {
  // Snake position
  const [snake, setSnake] = useState([
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 },
  ]);

  // Current direction
  const [direction, setDirection] = useState("RIGHT");

  // Food position
  const [food, setFood] = useState({
    x: 300,
    y: 200,
  });

  // Game status
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Score
  const [score, setScore] = useState(0);

  // Speed
  const [speed, setSpeed] = useState(200);

  // -----------------------------
  // KEYBOARD CONTROLS
  // -----------------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && direction !== "DOWN") {
        setDirection("UP");
      }

      if (event.key === "ArrowDown" && direction !== "UP") {
        setDirection("DOWN");
      }

      if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        setDirection("LEFT");
      }

      if (event.key === "ArrowRight" && direction !== "LEFT") {
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  // -----------------------------
  // SNAKE MOVEMENT
  // -----------------------------

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];

        // Current head
        let newHead = {
          x: newSnake[0].x,
          y: newSnake[0].y,
        };

        // Move according to direction
        if (direction === "RIGHT") {
          newHead.x += 20;
        }

        if (direction === "LEFT") {
          newHead.x -= 20;
        }

        if (direction === "UP") {
          newHead.y -= 20;
        }

        if (direction === "DOWN") {
          newHead.y += 20;
        }

        // -----------------------------
        // WALL COLLISION
        // -----------------------------

        if (
          newHead.x < 0 ||
          newHead.x >= 600 ||
          newHead.y < 0 ||
          newHead.y >= 400
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // -----------------------------
        // SELF COLLISION
        // -----------------------------

        const hitSelf = newSnake.some(
          (segment) =>
            segment.x === newHead.x && segment.y === newHead.y
        );

        if (hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        // Add new head
        newSnake.unshift(newHead);

        // -----------------------------
        // FOOD COLLISION
        // -----------------------------

        if (newHead.x === food.x && newHead.y === food.y) {
          // Increase score
          setScore((prevScore) => prevScore + 10);

          // Increase speed
          setSpeed((prevSpeed) =>
            Math.max(50, prevSpeed - 10)
          );

          // Generate new food
          setFood({
            x: Math.floor(Math.random() * 30) * 20,
            y: Math.floor(Math.random() * 20) * 20,
          });
        } else {
          // Remove tail
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, gameStarted, speed]);

  // -----------------------------
  // START / RESTART GAME
  // -----------------------------

  const startGame = () => {
    setSnake([
      { x: 100, y: 100 },
      { x: 80, y: 100 },
      { x: 60, y: 100 },
    ]);

    setFood({
      x: 300,
      y: 200,
    });

    setDirection("RIGHT");
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    setSpeed(200);
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="game-container">

      <Menu
        startGame={startGame}
        gameOver={gameOver}
      />

      {gameStarted && (
        <>
          <div className="score">
            Score: {score}
          </div>

          <div className="game-board">

            <Snake snake={snake} />

            <Food food={food} />

            {gameOver && (
              <div className="game-over">
                <h2>Game Over!</h2>
              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
}

export default App;