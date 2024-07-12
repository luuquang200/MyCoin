import React from "react";

function Header() {
  return (
    <header className="flex flex-wrap gap-0 justify-between text-sm leading-5 mb-4">
      <div className="flex gap-0 px-3 py-5 text-teal-500 max-md:pr-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e897239c02ee181410561308e06b264a4c706a2020e0857479e1fdcb786bf14?apiKey=1293b2add2d347908b4e11760098fdbe&"
          alt=""
          className="shrink-0 max-w-full aspect-[3.7] w-[129px]"
        />
        <div className="flex gap-3 px-3 my-auto">
          <div>|</div>
          <div>FIT COIN</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
