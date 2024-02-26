export function Tile({ content: Content, flip, state }) {
  if (state === "play" || state === "flipped") {
    return (
      <div
        style={{ perspective: "1000px" }}
        className="bg-transparent h-[78px] md:h-[100px] col-span-1  row-span-1 md:w-[100px] w-[78px]"
      >
        <div
          style={{
            transition: "transform 0.3s",
            transformStyle: "preserve-3d",
            transform: state === "flipped" && "rotateY(180deg)",
          }}
          className="relative w-full h-full"
        >
          <div
            style={{
              webkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
            className=" w-full h-full absolute rounded-xl md:rounded-2xl bg-indigo-300 text-center cursor-pointer"
            onClick={flip}
          ></div>
          <div
            style={{
              webkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="flex items-center absolute top-0 justify-center  text-white w-full h-full  rounded-xl md:rounded-2xl bg-indigo-500 text-center "
          >
            <div className="text-5xl md:text-6xl ">{Content}</div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex items-center justify-center opacity-60 h-[78px] p-2 w-[78px] md:h-[100px] md:w-[100px]  text-white col-span-1  row-span-1 bg-pink-400 rounded-xl md:rounded-2xl text-center">
        <div className="text-5xl md:text-6xl">{Content}</div>
      </div>
    );
}
