import React from "react";

function AddressSection() {
  var walletAddress = localStorage.getItem("walletAddress");
  return (
    <section className="mt-12 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b9551d995b1af8ce14ff40ce5f478897b798a06e24b680c96fbae01393fc5e9?apiKey=1293b2add2d347908b4e11760098fdbe&"
            alt="My address icon"
            className="shrink-0 max-w-full aspect-square w-[110px] max-md:mt-6"
          />
        </div>
        <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto uppercase max-w-[400px] max-md:mt-9 max-md:max-w-full">
            <h2 className="text-2xl font-black leading-9 text-black text-opacity-90 max-md:max-w-full">
              My address icon
            </h2>
            <p className="mt-2 text-sm leading-5 text-rose-500 max-md:max-w-full">
              <span className="text-black">
                Always look for the icon when sending to this wallet. And please
              </span>
              <br />
              <span className="text-black">keep your paper wallet at a </span>
              <span className="font-medium text-rose-500 uppercase">
                Safe Place!
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr className="shrink-0 mt-6 h-px border-t border-solid border-black border-opacity-10 max-md:max-w-full" />
      <div className="flex-wrap content-center py-4 mt-6 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch p-3 my-auto max-w-[394px] text-black text-opacity-90 max-md:mt-10">
              <h3 className="text-2xl font-black leading-9 uppercase">
                My wallet address
              </h3>
              <p className="mt-4 text-base leading-6">
                {walletAddress}
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d410e245ecb0bc526996857de6335d5e2750a138ad827787fca715f8351886a?apiKey=1293b2add2d347908b4e11760098fdbe&"
              alt="QR code for wallet address"
              className="shrink-0 max-w-full aspect-square w-[140px] max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddressSection;
