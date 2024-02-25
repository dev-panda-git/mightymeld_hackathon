import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

export const possibleTileContents = [
  "🐼",
  "💀",
  "👺",
  "👽",
  "👻",
  "🤖",
  "🎃",
  "🤡",
  "🥶",
];

export function StartScreen({ start }) {
  return (
    <div className="h-screen w-screen flex flex-col p-4 items-center bg-black gap-2 font-mono">
      <img src="match-tiles-logo.svg" className="h-[75vh] md:rotate-90 " />

      <div className="flex flex-col items-center md:relative md:-top-[10vh] gap-2">
        <p className="text-pink-400 md:text-2xl text-center">
          Flip over tiles looking for pairs
        </p>
        <button
          className="py-3 px-20 md:px-32 rounded-full bg-pink-500 hover:bg-pink-600 transition duration-300 ease-in-out  text-white shadow text-sm mt-6 animate-bounce text-xl font-bold"
          onClick={start}
        >
          Play
        </button>
        <p className="text-white">
          developed by{" "}
          <a href="https://tohir-babs.vercel.app/" className="underline">
            panda🐼
          </a>
        </p>
      </div>
    </div>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div className="w-screen h-screen  items-center bg-black flex flex-col font-mono">
        <div className=" w-[90vw] max-w-2xl h-[85vh] flex  flex-col justify-between items-center">
          <div className="flex w-full justify-between items-center">
            <img
              src="match-tiles-logo.svg"
              className="h-12 md:h-16 rotate-90"
            />

            <p className="text-white text-4xl">
              00.00.
              <span className="text-lg">00</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full justify-between">
              <p className="flex flex-col  items-center justify-center bg-white w-[80px] h-[80px] md:h-[100px] md:w-[100px] rounded-xl ">
                <span className="text-4xl">{tryCount}</span>
                <span>tries</span>
              </p>
              <p className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-indigo-400 w-[80px] h-[80px] md:h-[100px] md:w-[100px] rounded-xl">
                <span className="text-4xl">--</span>
                <span className="text-center leading-tight">
                  high <br /> score
                </span>
              </p>
            </div>

            <div className="grid grid-cols-4 grid-rows-4 gap-1">
              {getTiles(16).map((tile, i) => (
                <Tile
                  key={i}
                  className="flex flex-col  items-center justify-center bg-white w-[80px] h-[80px] md:h-[100px] md:w-[100px] rounded-xl "
                  flip={() => flip(i)}
                  {...tile}
                />
              ))}
            </div>
            <p className="text-white">
              developed by{" "}
              <a href="https://tohir-babs.vercel.app/" className="underline">
                panda🐼
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
