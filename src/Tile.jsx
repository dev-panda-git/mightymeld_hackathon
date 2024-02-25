export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block w-[80px] h-[80px] md:h-[100px] md:w-[100px] bg-indigo-300 text-center rounded-xl"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className=" h-[80px] w-[80px] md:w-[100px] md:h-[100px] rounded-xl bg-indigo-500 text-white p-2 text-5xl text-center flex items-center justify-center">
          {Content}
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block  h-[80px] w-[80px] md:w-[100px] md:h-[100px] rounded-xl bg-pink-400 opacity-70 p-2 text-5xl text-center flex items-center justify-center">
          {Content}
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return <div onClick={flip} className={className}></div>;
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
