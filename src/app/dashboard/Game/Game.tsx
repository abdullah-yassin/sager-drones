"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import "./Game.css";

// Define type for game state
interface GameState {
  numberToGuess: number;
  guess: string;
  message: string;
  gameOver: boolean;
}

const ParticlesComponent: React.FC<{ options: any }> = ({ options }) => {
  return useMemo(
    () => (
      <Particles id="tsparticles" options={options} style={{ zIndex: 0 }} />
    ),
    [options]
  );
};

const Game: React.FC = () => {
  // Initialize game state
  const [init, setInit] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    numberToGuess: Math.floor(Math.random() * 100) + 1,
    guess: "",
    message: "Guess a number between 1 and 100",
    gameOver: false,
  });

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({ ...gameState, guess: event.target.value });
  };

  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { numberToGuess, guess } = gameState;
    const parsedGuess = parseInt(guess, 10);

    if (parsedGuess === numberToGuess) {
      setGameState({
        ...gameState,
        message: "Congratulations! You guessed the number.",
        gameOver: true,
      });
    } else if (parsedGuess < numberToGuess) {
      setGameState({ ...gameState, message: "Too low. Try again.", guess: "" });
    } else {
      setGameState({
        ...gameState,
        message: "Too high. Try again.",
        guess: "",
      });
    }
  };

  const options: any = useMemo(
    () => ({
      background: {
        color: {
          value: "#18181b", // Adjust background color as needed
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 250,
            duration: 2,
            size: 10,
            opacity: 1,
          },
          push: {
            quantity: 20,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 1,
          width: 5,
        },
        move: {
          enable: true,
          speed: 1,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 180,
        },
        opacity: {
          value: 1,
        },
        size: {
          random: true,
          value: {
            min: 1,
            max: 3,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen text-white">
        <div className="bg-zinc-950 p-8 rounded-lg shadow-md">
          <Image
            alt="logo"
            height={"30"}
            width={"100"}
            src="https://sagerdrone.com/frontend/img/sager_log.svg"
          />
          <h1 className="text-3xl mb-4 mt-6">Drones Number Guessing Game</h1>
          <p className="text-center">{gameState.message}</p>

          {!gameState.gameOver && (
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex justify-center items-center"
            >
              <input
                required
                type="number"
                value={gameState.guess}
                onChange={handleChange}
                placeholder="Enter your guess"
                className="rounded-lg p-2 border border-gray-300 mr-2 bg-zinc-800"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                Guess
              </button>
            </form>
          )}
        </div>
      </div>
      {init && <ParticlesComponent options={options} />}
    </>
  );
};

export default Game;
